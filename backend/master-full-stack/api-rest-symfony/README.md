REVISAR DE LA ENTIDAD VIDEO EL RETORNO DE LA FUNCION (UDEMY 262)

public function getUser(): ?User
{
    return $this->user;
}

Donde se encuentran errores en ?User

    Expected type 'null|App\Entity\User'. Found 'User'.intelephense(10006)

Lo resolví por ahora de la siguiente manera:

    ?\User
