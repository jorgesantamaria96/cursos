<?php

namespace App\Services;

use Doctrine\ORM\EntityManager;
use Firebase\JWT\JWT;
use App\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class JwtAuth
{
    public $entityManager;
    public $key;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->key = "hola_que_tal_vamos_la_lepra562562673745614";
    }

    public function singup($email, $password, $getToken)
    {
        // Comprobar si el usuario existe
        $user = $this->entityManager->getRepository(User::class)->findOneBy([
            'email' => $email,
            'password' => $password
        ]);

        $signup = false;
        if (is_object($user)) {
            $signup = true;
        }

        // Si existe, generar el token de jwt
        if ($signup == true) {
            $token = [
                'sub' => $user->getId(),
                'name' => $user->getName(),
                'surname' => $user->getSurname(),
                'email' => $user->getEmail(),
                'role' => $user->getRole(),
                'iat' => time(),
                'exp' => time() + (7 * 24 * 60 * 60),
            ];

            // Comprobar el flag getToken, condición
            $jwt = JWT::encode($token, $this->key, 'HS256');
            if ($getToken) {
                $data = $jwt;
            } else {
                $decoded = JWT::decode($jwt, $this->key, ['HS256']);
                $data = $decoded;
            }
        } else {
            $data = [
                'status' => 'error',
                'message' => 'Login incorrecto'
            ];
        }

        // Devolver respuesta
        return $data;
    }

    public function checkToken($jwt, $identity = false)
    {
        $auth = false;

        try {
            $decoded = JWT::decode($jwt, $this->key, ['HS256']);
        } catch (\UnexpectedValueException $e) {
            $auth = false;
        } catch (\DomainException $e) {
            $auth = false;
        }

        if (isset($decoded) && !empty($decoded) && is_object($decoded) && isset($decoded->sub)) {
            $auth = true;
        } else {
            $auth = false;
        }

        if ($identity != false) {
            return $decoded;
        } else {
            return $auth;
        }
    }
}
