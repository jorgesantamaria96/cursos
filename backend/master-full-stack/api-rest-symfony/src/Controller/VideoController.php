<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Video;
use App\Repository\UserRepository;
use App\Repository\VideoRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Validation;
use App\Services\JwtAuth;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;

class VideoController extends AbstractController
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

    public function index(): Response
    {
        return $this->render('video/index.html.twig', [
            'controller_name' => 'VideoController',
        ]);
    }

    public function create(
        Request $request,
        JwtAuth $jwtAuth,
        EntityManagerInterface $entityManagerInterface,
        UserRepository $userRepository,
        VideoRepository $videoRepository,
        $id = null
    ) {
        // Array por defecto
        $data = [
            'status'  => 'error',
            'code'    => 400,
            'message' => 'El video no se ha creado.',
        ];

        // Recoger el token
        $token = $request->headers->get('Authorization', null);

        // Comporbar si es correcto
        $checkToken = $jwtAuth->checkToken($token);

        if ($checkToken) {
            // Recoger datos por post
            $json = $request->get('json', null);
            $params = json_decode($json);

            // Recoger objeto del usuario identificado
            $identity = $jwtAuth->checkToken($token, true);

            // Comporbar y validar datos
            if (!empty($json)) {
                $user_id = $identity->sub != null ? $identity->sub : null;

                $title = (!empty($params->title)) ? $params->title : '';
                $description = (!empty($params->description)) ? $params->description : '';
                $url = (!empty($params->url)) ? $params->url : '';

                if (!empty($user_id) && !empty($title)) {
                    // Guardar el nuevo video favorito en db
                    $user = $userRepository->findOneBy([
                        'id' => $identity->sub
                    ]);

                    if ($id == null) {
                        // Crear y guardar objeto
                        $created_at = new DateTime('now');
                        $updated_at = new DateTime('now');

                        $video = new Video();
                        $video->setTitle($title);
                        $video->setDescription($description);
                        $video->setUrl($url);
                        $video->setStatus('normal');
                        $video->setUser($user);
                        $video->setCreatedAt($created_at);
                        $video->setUpdatedAt($updated_at);

                        $entityManagerInterface->persist($video);
                        $entityManagerInterface->flush();

                        $data = [
                            'status'  => 'success',
                            'code'    => 200,
                            'message' => 'El video se ha creado.',
                            'video'   => $video,
                        ];
                    } else {
                        $video = $videoRepository->findOneBy([
                            'id' => $id,
                            'user' => $identity->sub,
                        ]);

                        if ($video && is_object($video)) {
                            $updated_at = new DateTime('now');

                            $video->setTitle($title);
                            $video->setDescription($description);
                            $video->setUrl($url);
                            $video->setUpdatedAt($updated_at);

                            $entityManagerInterface->persist($video);
                            $entityManagerInterface->flush();

                            $data = [
                                'status'  => 'success',
                                'code'    => 200,
                                'message' => 'El video se ha actualizado.',
                                'video'   => $video,
                            ];
                        }
                    }
                }
            }
        }

        // Devolver una respuesta
        return new JsonResponse($data);
    }

    public function videos(
        Request $request,
        JwtAuth $jwtAuth,
        PaginatorInterface $paginatorInterface,
        EntityManagerInterface $entityManagerInterface
    ) {
        // Recoger la cabecera de autenticación
        $token = $request->headers->get('Authorization', null);

        // Comprobar el token
        $checkToken = $jwtAuth->checkToken($token);

        // Si es válida,
        if ($checkToken) {
            // Conseguir la identidad del usuario
            $identity = $jwtAuth->checkToken($token, true);

            // Hacer una consulta para paginar
            /* $entityManager = $this->getDoctrine()->getManager(); */

            $dql = "SELECT v FROM App\Entity\Video v WHERE v.user = {$identity->sub} ORDER BY v.id DESC";
            /* $query = $entityManager->createQuery($dql); */
            /* $query = $videoRepository->createQueryBuilder($dql); */
            $query = $entityManagerInterface->createQuery($dql);

            // Recoger el parámetro page de la url
            $page = $request->query->getInt('page', 1);
            $itemsPerPage = 5;

            // Invocar paginación
            $pagination = $paginatorInterface->paginate($query, $page, $itemsPerPage);
            $total = $pagination->getTotalItemCount();

            // Preparar array de datos para devolver
            $data = [
                'status'  => 'success',
                'code'    => 200,
                'total_items_count' => $total,
                'page_actual' => $page,
                'total_pages' => ceil($total / $itemsPerPage),
                'itemsPerPage' => $itemsPerPage,
                'user_id' => $identity->sub,
                'videos' => $pagination->getItems(),
            ];
        } else {
            // Array por defecto
            $data = [
                'status'  => 'error',
                'code'    => 400,
                'message' => 'No se pueden listar los videos en éste momento.',
            ];
        }


        // Devolver una respuesta
        return new JsonResponse($data);
    }

    public function video(Request $request, JwtAuth $jwtAuth, $id = null)
    {
        // Sacar el token y comprobar si es correcto
        $token = $request->headers->get('Authorization', null);
        $checkToken = $jwtAuth->checkToken($token);

        // Array por defecto
        $data = [
            'status'  => 'error',
            'code'    => 404,
            'message' => 'Video no encontrado.',
        ];

        if ($checkToken) {
            // Sacar la identidad del usuario
            $identity = $jwtAuth->checkToken($token, true);

            // Sacar el objeto del video en base al id
            $video = $this->getDoctrine()->getRepository(Video::class)->findOneBy([
                'id' => $id,
            ]);

            // Comprobar si el video existe y es propiedad del usuario identificado
            if (!empty($video) && is_object($video) && $identity->sub == $video->getUser()->getId()) {
                $data = [
                    'status'  => 'success',
                    'code'    => 200,
                    'video' => $video,
                ];
            }
        }

        // Devolver una respuesta
        return new JsonResponse($data);
    }

    public function remove(
        Request $request,
        $id = null,
        JwtAuth $jwtAuth,
        EntityManagerInterface $entityManagerInterface,
        VideoRepository $videoRepository
    ) {
        $token = $request->headers->get('Authorization', null);
        $checkToken = $jwtAuth->checkToken($token);

        // Array por defecto
        $data = [
            'status'  => 'error',
            'code'    => 404,
            'message' => 'Video no encontrado.',
        ];

        if ($checkToken) {
            $identity = $jwtAuth->checkToken($token, true);

            $doctrine = $this->getDoctrine();
            $video = $videoRepository->findOneBy([
                'id' => $id
            ]);

            if ($video && is_object($video) && $identity->sub == $video->getUser()->getId()) {
                $entityManagerInterface->remove($video);
                $entityManagerInterface->flush();

                $data = [
                    'status'  => 'success',
                    'code'    => 200,
                    'video' => $video,
                ];
            }
        }

        return new JsonResponse($data);
    }
}
