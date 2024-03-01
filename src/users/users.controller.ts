import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Users } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.login(loginUserDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = this.generateToken(user); // Generar token JWT
    return { user, token }; // Devolver usuario y token en la respuesta
  }

  private generateToken(user: Users) {
    const payload = { username: user.username, sub: user.id }; // Información a incluir en el token
    return jwt.sign(payload, 'secretKey', { expiresIn: '1h' }); // Generar token JWT
  }

  @Post('logout')
  async logout(@Body() body: { userId: number }) {
    const { userId } = body;
    await this.usersService.logout(userId);
    // Aquí puedes retornar un mensaje de éxito
    return { message: 'Logout successful' };
  }
}


/*
 Tengo curiosidad,
 de saber cómo es que besas,
 ey, los asientos tiraos pa ´tras,
 mami deja eso.

 En la disco no llores, perrea,
 este Weeekend no traigas correa,
 sin cojones a ti quién te vea, ey.

 Porque mami una frikitona, no llora, 
 no llora, sola,
 si con él es la misma mierda siempre
 y conmigo diferente

 Porque mami una frikitona, no llora, 
 no llora, sola,
 si con él es la misma mierda siempre
 y conmigo diferente.

 Mami un splash, hoy te hago un splash,
 vos que me contash, te quiero tocar, 
 como guitarra Slash,
 Hoy vamo a prender y no hablo del flash,
 nunca falta el cash.

 Ridea agresiva sin que se lo pida,
 la bitchie está activa, si que me motiva y flash,
 Chiva, que el norte no olvida y ella bendecida,
 ¿cómo la voy a olvidar?

 Buenas, si las canciones hoy están buenas,
 ella me sigue el ritmo al bailar,
 se pone bellaquita al tomar,
 hoy se nos va a dar.

 Si me provoca, cree que va a evitar 
 y no voy a tocar, ahí es donde se equivoca,
 me tiene en el lente y no me desenfoca, ey
 a mi nombre se toc... 

 Con la más bonita estoy perreando, ando, 
 dos polvo´ a una shorty y luego cambio, cambio,
 cómo va a estar sola mi bebé,
 vamo a fumar y beber.

 Porque la vida es una,
 y desde chatelito que quería mis pesos,
 sangre de campeón, mami, yo no me estreso,
 todo aquel que toque a mi bebé,
 su mai que busque el café.

 -Ponele otra vez la pista al Hard

 (Mami)

 Movelo hasta que no quede ropa,
 la amiga es atrevida la trajo y se le nota,
 la baby se lleva bien con la nota,
 mientras más high se pone, más duro le rebota

 una frikitona, no llora, 
 no llora, sola,
 si con él es la misma mierda siempre
 y conmigo diferente.


 H-A-R-D con el 10 de León,
 nadie le mete tan cabrón,
 shorty quítate el pantalón,
 ya no llores sola, cura el mal de amor.

 Uy, party,
 esta es para las baby y las shortys,
 esta es para las baby y las shortys


 */


 /*
  - Que aquí no se frontea?, dale, juega

  Y toa´ las bodies ya me están pidiendo maleanteo,
  hoy hago creyente hasta al mayor ateo,
  100 por ciento trabajo, papi no hay recreo,
  no corro con feos.
 
  No soy la sensación del bloque, 
  pero sí soy la de tu bloque,
  a mí que el dm te explote,
  no es que me desenfoque,
  mientras sea quien te toque.
  
  No soy la sensación del bloque, 
  pero sí lo soy de tu bloque,
  a mí que el dm te explote,
  no es que me desenfoque,
  mientras sea quien te toque.

  Activo el super saiyan blue,
  las moñas son amarillas flow pikachu,
  mami estoy facturando, me voa´ salir de la U,
  yo bien acondicionado, el jevo tuyo es shampoo,
  servime un moscow mule.

  Que me voa´ llamar al alfa y nos vamos a Singapur,
  tengo un pasaje al cielo, si querés te doy el tour,
  Papi esto es Nicragua, hablas de vos no hablas de tú, 
  ella me lleva al espacio aunque no es Sailor Moon.

  BadBunny con La Paciencia, 
  y yo me propio productor, mai no tiene tanta ciencia,
  decime tus virtudes, que resalto tus carencias,
  y es porque yo sé, yeh.

  No soy la sensación del bloque, 
  pero sí soy la de tu bloque,
  a mí que el dm te explote,
  no es que me desenfoque,
  mientras sea quien te toque.
  
  No soy la sensación del bloque, 
  pero sí lo soy de tu bloque,
  a mí que el dm te explote,
  no es que me desenfoque,
  mientras sea quien te toque.

  Mi primera chamba, 
  fue quitarle la tanga,
  madrugando en el estudio, los ojos de un panda,
  me muero leyenda como lo hizo mamba.

  Pa eso trabajo, para nunca estar estril
  yo solo entreno si es en el ALonsoGym,
  si agarraste confianza es porque yo te la di,
  número equivocado, llamate a la HotLine Bling.

  Si quieres saber algo sobre mi música, 
  papi pregúntamelo a mí,
  yo me voy a ir muy muy muy muy muy lejos de aquí,
  así que no me extrañen ni pregunten por mí, me fui.

  Mi especialidad es morime como Kenny,
  pero al siguiente día resucitar como ave fénix,
  que elegante son mis tenis, 
  solo marcas caras ya no compro en jcpenney

  Qué tiene de malo mezclar Joya y Don Peri,
  le dije hola a las partys, ya las babys están ready,
  ahora mismo...
 */