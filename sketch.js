//principal
var jugador,velocidad_jugador = 20,nivel = "inicio",direccion_bala = "arriba";
var powerups,niveles,caja_tutorial;

//fondos
var cueva;
var limite;
// grupos
var balas,piedras;

//animaciones
var A_piedras;
function preload(){
    //decoracion
    
    //objetos o enemigos
    A_piedras = loadAnimation("./animaciones/piedras/piedras1.png","./animaciones/piedras/piedras2.png",
    "./animaciones/piedras/piedras3.png","./animaciones/piedras/piedras4.png","./animaciones/piedras/piedras5.png");
    cueva = loadImage("./imagenes/cueva.png");

}
function setup(){
jugador = createSprite (windowWidth/2,windowHeight/2);
jugador.scale=0.3;
jugador.shapeColor = "lime";

//grupos
balas = createGroup();
piedras = createGroup();
}
function draw(){
createCanvas(windowWidth,windowHeight);
background("gray");
console.log(nivel);
movimiento();
accesos();
drawSprites();
}
function accesos(){
if (nivel === "inicio"){
    C_powerups = createSprite (100,100,100,100);
    C_powerups.shapeColor = "green";

    niveles = createSprite (windowWidth / 2,100,100,100);
    niveles.shapeColor = "orange";

    caja_tutorial = createSprite (windowWidth - 100,100,100,100);
    caja_tutorial.shapeColor = "yellow";
    
    nivel = "inicio_elegir";
}
if (nivel === "inicio_elegir"){
    inicio();
}

if (nivel === "powerups"){
    powerups();
}
if (nivel === "elegir_niveles"){
    elegir_niveles();
}
if (nivel === "tutorial"){
    tutorial();
}
if (nivel === 1){
        nivel_1();
    }
}
function movimiento(){
    if (keyDown("SHIFT")){
        velocidad_jugador += 1;
        console.log(velocidad_jugador);
    }
    if (keyDown("BACKSPACE")){
        velocidad_jugador -= 1;
        console.log(velocidad_jugador);
    }
    if (velocidad_jugador > 60){
        velocidad_jugador = 60;
    }else if (velocidad_jugador < 0){
        velocidad_jugador = 0;
    }

if (keyDown("A")){
        jugador.x -= velocidad_jugador;
        direccion_bala = "izquierda";
    }
if (keyDown("D")){
        jugador.x += velocidad_jugador;
        direccion_bala = "derecha";
    }
if (keyDown("W")){
        jugador.y -= velocidad_jugador;
        direccion_bala = "arriba";
    }
if (keyDown("S")){
        jugador.y += velocidad_jugador;
        direccion_bala = "abajo";
    }
if (keyDown("LEFT")){
        jugador.x -= velocidad_jugador;
        direccion_bala = "izquierda";
    }
if (keyDown("RIGHT")){
        jugador.x += velocidad_jugador;
        direccion_bala = "derecha";
    }
if (keyDown("UP")){
        jugador.y -= velocidad_jugador;
        direccion_bala = "arriba";
    }
if (keyDown("DOWN")){
        jugador.y += 20;
        direccion_bala = "abajo";
    }
    if (keyWentUp("SPACE")){
        disparar();
    }
    if (keyWentUp("ENTER")){
        disparar();
    }


    if(jugador.x > windowWidth - 15){
        jugador.x = windowWidth - 15;
    }
    if(jugador.x < 0 + 15){
        jugador.x = 0 + 15;
    }
    if(jugador.y > windowHeight - 15){
        jugador.y = windowHeight - 15;
    }
    if(jugador.y < 0 + 15){
        jugador.y = 0 + 15;
    }

}
function disparar(){
if (direccion_bala === "izquierda"){
    var bala = createSprite (jugador.x,jugador.y,20,20);
    bala.setCollider ("circle",0,0,17);
    bala.shapeColor = "red";
    bala.velocityX -= 30;
    bala.lifetime = 200;
    balas.add(bala);
}
if (direccion_bala === "derecha"){
    var bala = createSprite (jugador.x,jugador.y,20,20);
    bala.setCollider ("circle",0,0,17);
    bala.shapeColor = "red";
    bala.velocityX += 30;
    bala.lifetime = 200;
    balas.add(bala);
}
if (direccion_bala === "arriba"){
    var bala = createSprite (jugador.x,jugador.y,20,20);
    bala.setCollider ("circle",0,0,17);
    bala.shapeColor = "red";
    bala.velocityY -= 30;
    bala.lifetime = 200;
    balas.add(bala);

}
if (direccion_bala === "abajo"){
    var bala = createSprite (jugador.x,jugador.y,20,20);
    bala.setCollider ("circle",0,0,17);
    bala.shapeColor = "red";
    bala.velocityY += 30;
    bala.lifetime = 200;
    balas.add(bala);
}
}
function lluvia_de_piedras(){
if (frameCount % cooldown_piedras === 0){
    var piedra = createSprite (random(15,windowWidth - 15),-30,30,30);
    piedra.addAnimation ("rocas cayendo",A_piedras);
    piedra.scale = 3;
    piedra.velocityY = velocidad_piedras;
    piedra.lifetime = 100;
    piedra.setCollider ("circle",0,0,3);
    piedras.add (piedra);
}
piedras.bounceOff (balas);
if (piedras.isTouching(jugador)){
    nivel = "inicio";
}

}
function inicio(){
    fill("green");
    textSize(30);
    text("POWERUPS",C_powerups.x - 80,C_powerups.y + 100);
    text("presiona 1",C_powerups.x - 70,C_powerups.y + 140);
        if (keyDown("1")){
            C_powerups.destroy();
            niveles.destroy();
            caja_tutorial.destroy();
    
            nivel = "powerups";
            }
    
    fill("orange");
    textSize(30);
    text("NIVELES",niveles.x - 60,niveles.y + 100);
    text("presiona 2",niveles.x - 70,niveles.y + 140);
        if (keyDown("2")){
            nivel = "elegir_niveles";
    
            C_powerups.destroy();
            niveles.destroy();
            caja_tutorial.destroy();
        }

    fill("yellow");
    textSize(30);
    text("TUTORIAL",caja_tutorial.x - 70,caja_tutorial.y + 100);
    text("presiona 3",caja_tutorial.x - 70,caja_tutorial.y + 140);
        if (keyDown("3")){
            C_powerups.destroy();
            niveles.destroy();
            caja_tutorial.destroy();
    
            nivel = "tutorial";
            segundos = 0;
            caja_powerups = createSprite (20,windowHeight / 2, 40,40);
            caja_powerups.shapeColor = "cian";
            caja_powerups.visible = false;
    
            caja_inicio = createSprite (windowWidth - 20,windowHeight / 2,40,40);
            caja_inicio.shapeColor = "blue";
            caja_inicio.visible = false;
        }
        
}
function powerups(){
    fill("red");
    textSize(40);
    text ("ESTO SERA AÑADIDO PROXIMAMENTE ( reinicia la pagina )",100,windowHeight/2);
}
function elegir_niveles(){
    fill("lime");
    textSize(40);
    text ("PRESIONA 1 (esto solo es beta)",100,windowHeight/2);
    if (keyDown ("1")){
        nivel = 1;
        limite = createSprite (windowWidth/2,windowHeight/2,windowWidth,100);
        limite.visible = false;
        jugador.y = windowHeight/2 + 100;
    }
}
function tutorial (){
if(frameCount % 30 === 0){
    segundos += 1;
}
if (segundos >= 0 && segundos <= 2){
textSize(40);
fill("yellow");
text("BIENVENIDO/A AL TUTORIAL",jugador.x - 250,jugador.y - 40);
}
if (segundos >= 3 && segundos <= 5){
    textSize(40);
    fill("yellow");
    text("ANTES QUE NADA",jugador.x - 200,jugador.y - 80);
    text("APRENDAMOS LOS MOVIMIENTOS BASICOS",jugador.x - 450,jugador.y - 40);
    }
    if (segundos >= 6 && segundos <= 10){
        textSize(40);
        fill("yellow");
        text("USA W - A - S - D PARA MOVERTE",jugador.x - 300,jugador.y - 80);
        text("( tambien puedes usar las flechas )",jugador.x - 300,jugador.y - 40);
        }
        if (segundos >= 11 && segundos <= 15){
            textSize(40);
            fill("yellow");
            text("AHORA PRESIONA",jugador.x - 200,jugador.y - 120);
            fill ("white");
            text("( SPACE - ENTER )",jugador.x - 200,jugador.y - 80);
            fill("yellow");
            text("PARA DISPARAR",jugador.x - 200,jugador.y - 40);
            }
            if (segundos >= 16 && segundos <= 18){
                textSize(40);
                fill("yellow");
                text("LAS BALAS IRAN A DONDE ",jugador.x - 250,jugador.y - 120);
                fill ("lime");
                text("TU PERSONAJE",jugador.x - 150,jugador.y - 80);
                fill("yellow");
                text("ESTE MIRANDO",jugador.x - 150,jugador.y - 40);
                }
            if (segundos >= 19 && segundos <= 25){
                textSize(40);
                fill("yellow");
                text("TAMBIEN PUEDES CONTROLAR TU VELOCIDAD",jugador.x - 420,jugador.y - 160);
                text("PRESIONANDO",jugador.x - 120,jugador.y - 120)
                fill ("white");
                text("( SHIFT - BACKSPACE [el de eliminar letras])",jugador.x - 400,jugador.y - 80);
                fill("#3AF876");
                text("TU VELOCIDAD APARECE ABAJO A LA IZQUIERDA",jugador.x - 400,jugador.y - 40);

                textSize(20);
                fill("#3AF876")
                text ("VELOCIDAD " + velocidad_jugador,10,windowHeight - 20);
                }
                if (segundos > 25){
                    textSize(40);
                    fill("white");
                    text("VE A LA IZQUIERDA PARA VER LOS POWERUPS",100,40);
                    fill("black");
                    text("VE A LA DERECHA PARA VOLVER AL INICIO",100,windowHeight - 40);
                    caja_inicio.visible = true;
                    caja_powerups.visible = true;
                if (jugador.isTouching(caja_powerups)){
                    nivel = "powerups";
                    caja_inicio.destroy();
                    caja_powerups.destroy();
                }
                if (jugador.isTouching(caja_inicio)){
                    nivel = "inicio";
                    caja_inicio.visible = false;
                    caja_powerups.visible = false;
                }
                    }
}
function nivel_1(){
background (cueva);
if(jugador.isTouching(limite)){
    jugador.y = windowHeight / 2 + 65;
}

textSize(20);
fill("#3AF876")
text ("VELOCIDAD " + velocidad_jugador,10,windowHeight - 20);

cooldown_piedras = 5;
velocidad_piedras = 10;
lluvia_de_piedras();
}