<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\VideoRepository;
use DateTime;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Validation;
use App\Services\JwtAuth;

class UserController extends AbstractController
{
    private function resjson($data)
    {
        // Serializar datos con servicio serializer
        $json = $this->get('serializer')->serialize($data, 'json');

        // Response con HttpFoundation
        $response = new Response();

        // Asignar contenido a la respuesta
        $response->setContent($json);

        // Indicar el formato de respuesta
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    public function index(
        UserRepository $userRepository,
        VideoRepository $videoRepository
    ): Response {
        $response = new JsonResponse();

        $users = $userRepository->findAll();
        $user = $userRepository->find(2);

        /* $response->setData([
            'user' => json_encode($user->getVideos())
        ]); */

        /* foreach ($users as $user) {
            echo "<h1>{$user->getName()} {$user->getSurname()}</h1>";

            foreach ($user->getVideos() as $video) {
                echo "<p>{$video->getTitle()} {$video->getUser()->getEmail()}</p>";
            }
        } */

        return $this->resjson($user->getVideos());
    }

    public function create(Request $request, UserRepository $userRepository)
    {
        // Recoger los datos por post
        $json = $request->get('json', null);

        // Decodificar el json
        $params = json_decode($json);

        // Hacer una respuesta por defecto
        $data = [
            'status'  => 'error',
            'code'    => 404,
            'message' => 'El usuario no se ha creado.',
        ];

        // Comprobar y validar datos
        if ($json != null) {
            $name = isset($params->name) ? $params->name : null;
            $surname = isset($params->surname) ? $params->surname : null;
            $email = isset($params->email) ? $params->email : null;
            $password = isset($params->password) ? $params->password : null;

            $validator = Validation::createValidator();
            $validate_email = $validator->validate($email, [
                new Email()
            ]);

            if (!empty($email) && count($validate_email) == 0 && !empty($password) && !empty($name) && !empty($surname)) {
                // Si es correcta, crear el objeto del usuario
                $user = new User();
                $user->setName($name);
                $user->setSurname($surname);
                $user->setEmail($email);
                $user->setRole('ROLE_USER');
                $user->setCreatedAt(new DateTime('now'));

                // Cifrar la contraseña
                $pwd = hash('sha256', $password);
                $user->setPassword($pwd);

                $data = $user;
                $entityManager = $this->getDoctrine()->getManager();

                // Comprobar si el usuario existe
                $isset_user = $userRepository->findBy(array(
                    'email' => $email,
                ));

                if (count($isset_user) == 0) {
                    // Guardo el usuario
                    $entityManager->persist($user);
                    $entityManager->flush();

                    $data = [
                        'status'  => 'success',
                        'code'    => 200,
                        'user' => $user,
                    ];
                } else {
                    $data = [
                        'status'  => 'error',
                        'code'    => 400,
                        'message' => 'El usuario ya existe.',
                    ];
                }

                // Si no existe, guardarlo en la base de datos
            }
        }


        // Devolver respuesta en json
        //return new JsonResponse($data);
        return $this->resjson($data);
    }

    public function login(Request $request, JwtAuth $jwtAuth)
    {
        // Recibir los datos por post del usuario a loguear
        $json = $request->get('json', null);
        $params = json_decode($json);

        // Array por defecto para devolver
        $data = [
            'status'  => 'error',
            'code'    => 404,
            'message' => 'El usuario no se ha podido identificar.',
        ];

        // Comprobar y validar datos
        if ($params != null) {
            $email = isset($params->email) ? $params->email : null;
            $password = isset($params->password) ? $params->password : null;
            $getToken = isset($params->getToken) ? $params->getToken : false;

            $validator = Validation::createValidator();
            $validate_email = $validator->validate([
                new Email()
            ]);

            if (!empty($email) && !empty($password) && count($validate_email) == 0) {
                // Cifrar la contraseña
                $pwd = hash('sha256', $password);

                /* var_dump($pwd, $email, $getToken);die(); */
                // Llamaremos a un servicio para identificar al usuario (jwt) => token || object
                $signup = $jwtAuth->singup($email, $pwd, $getToken);

                $data = $signup;
            } else {
                $data = [
                    'status'  => 'error',
                    'code'    => 404,
                    'message' => 'El usuario no se ha podido identificar.',
                ];
            }
        }

        // Si todo va bien, respuesta
        return new JsonResponse($data);
    }

    public function edit(Request $request, JwtAuth $jwtAuth)
    {
        // Recoger la cabecera de autenticación
        $token = $request->headers->get('Authorization');

        // Crear un método para comprobar si el token es correcto
        $checkToken = $jwtAuth->checkToken($token);

        // Respuesta por defecto para devolver
        $data = [
            'status'  => 'error',
            'code'    => 404,
            'message' => 'Usuario NO ACTUALIZADO.'
        ];

        // Si es correcto, hacer la actualización del usuario
        if ($checkToken) {
            // Actualizar el usuario

            // Conseguir entityManager
            $entityManager = $this->getDoctrine()->getManager();

            // Conseguir los datos del usuario identificado
            $identity = $jwtAuth->checkToken($token, true);

            // Conseguir el usuario a actualziar completo
            $userRepository = $this->getDoctrine()->getRepository(User::class);
            $user = $userRepository->findOneBy([
                'id' => $identity->sub
            ]);

            // Recoger los datos por post
            $json = $request->get('json', null);
            $params = json_decode($json);

            // Comprobar y validar los datos
            if (!empty($json)) {
                $name = isset($params->name) ? $params->name : null;
                $surname = isset($params->surname) ? $params->surname : null;
                $email = isset($params->email) ? $params->email : null;

                $validator = Validation::createValidator();
                $validate_email = $validator->validate($email, [
                    new Email()
                ]);

                if (!empty($email) && count($validate_email) == 0 && !empty($name) && !empty($surname)) {
                    // Asignar nuevos datos al objeto del usuario
                    $user->setEmail($email);
                    $user->setName($name);
                    $user->setSurname($surname);

                    // Comprobar duplicados
                    $isset_user = $userRepository->findBy([
                        'email' => $email
                    ]);

                    if (count($isset_user) == 0 || $identity->email == $email) {
                        // Guardar cambios en la base de datos
                        $entityManager->persist($user);
                        $entityManager->flush();

                        $data = [
                            'status'  => 'success',
                            'code'    => 200,
                            'message' => 'Usuario actualizado.',
                            'user'    => $user,
                        ];
                    } else {
                        $data = [
                            'status'  => 'error',
                            'code'    => 400,
                            'message' => 'No puedes usar ese email.'
                        ];
                    }
                }
            }
        }

        // Devolver la respueta
        return new JsonResponse($data);
    }
}
