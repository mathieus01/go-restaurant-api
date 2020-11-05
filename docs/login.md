Historia

usuario faz POST com email, senha
valida se existe uma conta com esse email
compara senha com a senha informada para validar se a senha é valida
gera um token
grava o token no banco com a conta do usuario
200 - retorna token para o front

Excessoes

404 - email nao encontrado
403 - senha incorreta
500 - erro ao realizar alguma consulta
    - erro ao gravar token no banco

