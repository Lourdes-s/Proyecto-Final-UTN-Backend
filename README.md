##README

**Descripción**
Este proyecto consiste en una aplicación de mensajería inspirada en whatsapp, no está terminada completamente y tiene cosas que pulir. Es la continuación del primer trabajo entregado de frontend, a este se le incorporo todo el backend y todo el flujo de “register”, “login”, “forgot password”, “recovery password”, también la posibilidad de editar tu perfil y algunas cosas extras como las rutas protegidas del lado del frontend o el “404 not found” el cual es frecuente que salga cada vez que quieras ingresar un chat cuyo usuario no tengas agregado a contactos, siendo este un punto faltante muy importante a terminar de  desarrollar completamente, porque aún no está incorporada la opción de agregar contactos desde el frontend.
Dejo un usuario con el que se puede probar los chats y mandar mensajes:
Email: lourdes.tests@gmail.com
Password: Mensajeria123
También el curl de postman por si quieren añadir un contacto de esta forma
cURL --location --request POST 'https://proyecto-final-utn-backend.vercel.app/api/contact’\
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
--data-raw '{
    "email": "lourdes.tests+8@gmail.com"
}'


**Librerías usadas**
En esto no profundice más de lo que trabaje en el primer trabajo además de los iconos solamente está el “loader” de la siguiente librería https://codepen.io/aryabardhan/pen/qBwVgRV.
