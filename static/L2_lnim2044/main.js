function validemail(){
    var x = document.getElementById("emailinput")
    let yahootest = x.value.includes("@yahoo")
    let gmailtest = x.value.includes("@gmail")
    if(yahootest || gmailtest){
        x.setCustomValidity('')
    }

    if(!(yahootest) && !(gmailtest)){
        x.setCustomValidity("Gmail vagy Yahoo E-Mail szukseges")
        x.reportValidity()
    } 
    submitcheck()
}

function validfavpage(){
    var x = document.getElementById("favpage")
    let n = x.value.split('.').length
    let firsterror = 0
    if(n==2){//ha valamelyik sajat feltetelunknek nem felel meg, sCV-t hivok meg ami a validity-t elrontja. ezutan a submitcheck nezi a validity.valid-ot amin szinten tul kell menjen (garantaltan nem fog ha a sCV nem "", ha meg igen, akkor a bongeszoen kell atmenjen, ugyanigy az e-mailnel is) 
        x.setCustomValidity("Nem tartalmaz aldomeniumot")
        x.reportValidity()
        firsterror=1
    }
    else
    if(n==1){
        x.setCustomValidity("Nem tartalmaz domeniumot")
        x.reportValidity()
        firsterror=2
    }
    else{
        x.setCustomValidity('')
        firsterror=0
    }

    var rgx = new RegExp("^[a-zA-Z0-9\-_:\.\/]+$")
    if(firsterror===0){
        if(rgx.test(x.value)){
            x.setCustomValidity('')
        }
        else{
            x.setCustomValidity("Hasznalj csak betuket, szamokat, -_:./ jeleket")
            x.reportValidity()
        }
    }
    submitcheck()
}

function startup(){
    document.getElementById("footerdiv").innerHTML = "<footer>"+document.lastModified+"</footer>";//was footerdiv
    //document.getElementById("footerdiv2").innerHTML = document.lastModified;
    //document.getElementsByClassName("footertext").innerHTML = document.lastModified;
    //document.getElementsById("footerp").innerHTML = document.lastModified;
    canvasDefault();
}

function submitcheckCS(){
    /*var x = document.getElementById("csaladnev") // EZ IGY MEGOLDVA NEM MEGY JOL NEM TUDOM MIERT
    if(!document.forms['myform']['csaladnev'].validity.valid){
        x.setCustomValidity("Csak betukbol allhat es az elso nagy kell legyen")
        x.reportValidity()
    }
    else {
        x.setCustomValidity('')  
        x.reportValidity()
    }*/
    var x = document.getElementById("csaladnev");
    if (!x.checkValidity()) {
        document.getElementById("errortext").innerHTML = x.validationMessage;
    } 
    else {
        document.getElementById("errortext").innerHTML = "";
    } 
    submitcheck()
}

function submitcheckK(){
    /*var x = document.getElementById("keresztnev")
    if(!document.forms['myform']['keresztnev'].validity.valid){
        x.setCustomValidity("Csak betukbol allhat es az elso nagy kell legyen")
        x.reportValidity()
    }
    else {
        x.setCustomValidity('')
        x.reportValidity()
    }*/

    var x = document.getElementById("keresztnev");
    if (!x.checkValidity()) {
        document.getElementById("errortext").innerHTML = x.validationMessage;
    } 
    else {
        document.getElementById("errortext").innerHTML = "";
    } 
    submitcheck()
}

function submitcheck(){
    var ok = true;

    if(!document.forms["myform"]["csaladnev"].validity.valid ||
       !document.forms["myform"]["keresztnev"].validity.valid ||
       !document.forms["myform"]["emailinput"].validity.valid ||
       !document.forms["myform"]["favpage"].validity.valid ||
       !document.forms["myform"]["bday"].validity.valid)//bongeszo validjait nezem (sajatok az email az favpage sajat fuggvenyeiben)
       {
           ok = false;
       }

    if(ok){
        document.getElementById("submit").disabled = false
    }
    else{
        document.getElementById("submit").disabled = true
    }
}

function canvasDefault(){
    var c = document.getElementById("mycanvas");
    c.width= 600;
    c.height= 600;
    var ctx = c.getContext("2d");
    var img = document.getElementById("bronyabike");
    img.centerX = -img.width/2;
    img.centerY = -img.height/2;
    img.cornerx = 200;
    img.cornery = 200;
    img.direction = 0;//elfordulasi szog
    ctx.drawImage(img,200,200);
}

function movecarfinal(irany,fok){

    var c = document.getElementById("mycanvas");
    c.width= 600;
    c.height= 600;
    
    var ctx = c.getContext("2d");
    var img = document.getElementById("bronyabike");
    var rotation = 0;
       
    if(irany===1)rotation=fok
        else rotation=360-fok
    img.direction = img.direction + rotation;
    img.style.transform = "rotate("+img.direction+"deg)";

    ctx.translate(c.width/2,c.height/2);
    ctx.rotate(img.direction*Math.PI/180);
    ctx.drawImage(img,-img.width/2+img.cornerx-200,-img.width/2+img.cornery-200);
}


function movecarjs(){
    var e1 = document.getElementById("movecar");//elore/hatra/jobbra/balra
    var x1 = e1.value;
    var e2 = document.getElementById("carinput")//elore/hatra mozgasszam vagy balra/jobbra forgatas szam
    var x2 = Number(e2.value);
    movecarcmd(x1,x2)
}


function movecarcmd(movecmd,movevalue){
    var c = document.getElementById("mycanvas");
    c.width= 600;
    c.height= 600;
    var ctx = c.getContext("2d");
    var img = document.getElementById("bronyabike");

    if(movecmd==="elore"){
        img.cornerx = img.cornerx + movevalue
        if(img.cornerx>400) img.cornerx=0
            else if(img.cornerx<0) img.cornerx=400
                else if(img.cornery>400) img.cornery=0
                    else if(img.cornery<0) img.cornery=400

        movecarfinal(1,0);
    } 
    else
    if(movecmd==="hatra"){
        img.cornerx = img.cornerx - movevalue
                if(img.cornerx>400) img.cornerx=0
                else if(img.cornerx<0) img.cornerx=400
                    else if(img.cornery>400) img.cornery=0
                        else if(img.cornery<0) img.cornery=400
        movecarfinal(1,0);
    }
    else
    if(movecmd==="balra"){
        movecarfinal(1,movevalue)
    }
    else
    if(movecmd==="jobbra"){
        movecarfinal(2,movevalue)
    }
}   