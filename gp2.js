//==================SIDE BAR FADEIN AND FADEOUT==================//
$(document).ready(function(){
    $('.icon').click(function(){
        $('.side').fadeIn();
        $('.closeside').click(function(){
            $('.side').fadeOut(); 
        })
    })
    // alert('the "get Gp" button has to be clicked before clicking the "get CGPA" button')
})



var courseArr=[]
var scorearr =[]
var unitarr=[]
var totalpointArr=[]
var totalunitArr=[]
var gparr=[]


let container = (function (){
 return {
    
    grade: function(){
        for(let i=1; i<=8; i++){
            var InputScore= document.querySelector('#sc_' + i).value  
            
            if (InputScore >= 70){
                grade=5
            } else if (InputScore < 70 && InputScore >=60){
                grade = 4
            }else if (InputScore < 60 && InputScore >= 50){
                grade = 3
            }else if (InputScore < 50 && InputScore >=45){
                grade = 2
            }else if (InputScore < 45 && InputScore >=40){
                grade = 1
            }else if ( InputScore < 40){
                grade =0
            }
            scorearr.push(grade)
            
         }// for loop terminal
         console.log (scorearr)
    
    }, //grade object terminal

    unit: function (){
        for(let i=1; i<=8; i++){
            var InputUnit= document.querySelector('#unt_' + i).value 
           if (InputUnit!== ""){
            unitarr.push(parseFloat(InputUnit))
           }else{
               InputUnit=0
               unitarr.push(parseFloat(InputUnit))
           }
              
        } // for loop terminal
        console.log(unitarr);
        
    },
    SumUnitArray: function(){
        let totalUnit
        totalUnit=0
        for (let i=0; i<=unitarr.length-1; i++){
          totalUnit+=unitarr[i]  
        }
        console.log(totalUnit);
        
               

        return{
            TotalUnit: totalUnit
        }
        
        
    },

    UnitAndGradeProduct: function(){
       let total =0
        for (let n=0; n<=unitarr.length-1; n++){
           let product= unitarr[n]* scorearr[n]
           total+=product
        }
        
       //console.log(total);
       
    
  
    //    console.log(sumTP);
       

        return {
            totalpoint: total
        }
        
    },
    Division: function(){
       let TP, TU
        TP= this.UnitAndGradeProduct().totalpoint
        TU= this.SumUnitArray().TotalUnit
        gp=TP/TU
        
        
        gparr.push(gp)
        if (gp === 5 || gp ==4 || gp === 3 || gp === 2 || gp=== 1 || gp === 0 ){
            gp= gp + '.00'
       }else{
           gp= Math.floor(gp*100)/100
       }
       let comment;
         if(gp <= 5.0 && gp >=4.5){
             comment='YOU are on first class with an Excellent GP of ' + gp
         }else if(gp < 4.5 && gp >=3.5){
            comment='YOU are on Second class Upper with a sound GP of ' + gp
        }else if(gp < 3.5 && gp >=2.5){
            comment='YOU are on Second class Lower with a GP of ' + gp
         }else if(gp < 2.5 && gp >=1.5){
            comment='YOU are on Third class with a GP of ' + gp
        }else if(gp < 1.5 && gp >=1.0){
            comment='YOU are on pass with  poor GP of ' + gp
        }else if(gp <= 1.0 && gp >=0){
            comment='YOU are on probation with a GP of ' + gp + 'Failure to improve next semster will lead you to road 1 ' 
        }else{
            comment='please Enter reasonable values'
        }
    document.querySelector('.what').textContent=comment;
    for (let i=1; i<=8; i++){
        if(document.querySelector('#sc_' + i).value !== ""){
            $('.saveData').fadeIn()
        }
    }
    
   
       console.log(gp);
        console.log(gparr);

        return{
            comment:comment
        }
       
    },


    pushing: function (){
        totalpointArr.push(this.UnitAndGradeProduct().totalpoint)
        console.log(totalpointArr)
        
        totalunitArr.push(this.SumUnitArray().TotalUnit)
         console.log(totalunitArr);
         
         let sumTP=0
         let sumTU=0
         for (let i=0; i<=totalpointArr.length-1; i++){
             sumTP+=totalpointArr[i]
             sumTU+=totalunitArr[i]
             
         }

         console.log(sumTP)
         console.log(sumTU)

         return{
             STP: sumTP,
             STU: sumTU,
             GPARR: gparr
         }
             
    },
   
    initialValues: function (){
        scorearr=[]
        unitarr=[]
    },

    savingdata:function(){
        window.localStorage.setItem('tpr', JSON.stringify(totalpointArr))
        window.localStorage.setItem('tur', JSON.stringify(totalunitArr))
        for(var i=0; i<8; i++){
            var Inputcourse= document.querySelector('#cos_' + i).value
            courseArr.push(Inputcourse)
        }
        window.localStorage.setItem('courses',JSON.stringify(courseArr))

       
    }

}// return terminal





})()





document.querySelector('.btnget').addEventListener('click', function (){
   
    container.grade()
    container.unit()
    container.SumUnitArray()
    container.UnitAndGradeProduct()
    container.Division()
    container.pushing()
    

    document.querySelector('.btnnext').addEventListener('click', function(){
        for (i=1; i<=8; i++){
           document.querySelector('#sc_'+ i).value =""
           document.querySelector('#unt_'+ i).value=""  
       } //for loop terminal
    }) //btn next terminal

  
  //=====================DETRMINING THE CGPA==================//
    document.querySelector('.cgpa').addEventListener('click', function (){
    
        let cgpa
        cgpa = container.pushing().STP/container.pushing().STU
        if (cgpa === 5 || cgpa ===4 || cgpa === 3 || cgpa === 2 || cgpa=== 1 || cgpa === 0 ){
            cgpa= cgpa + '.00'
        }else{
            cgpa= Math.floor(cgpa*100)/100
        }
        console.log(cgpa);
   
     let CGPcomment;
     if(cgpa <= 5.0 && cgpa >=4.5){
        CGPcomment='YOU are on first class with an Excellent CGPA of ' + cgpa
     }else if(cgpa < 4.5 && cgpa >=3.5){
        CGPcomment='YOU are on Second class Upper with a sound CGPA of ' + cgpa
    }else if(cgpa < 3.5 && cgpa >=2.5){
        CGPcomment='YOU are on Second class Lower with a CGPA of ' + cgpa
     }else if(cgpa < 2.5 && cgpa >=1.5){
        CGPcomment='YOU are on Third class with a CGPA of ' + cgpa
    }else if(cgpa < 1.5 && cgpa >=1.0){
        CGPcomment='YOU are on pass with  poor CGPA of ' + cgpa
    }else if(cgpa <= 1.0 && cgpa >=0){
        CGPcomment='YOU are on probation with a CGPA of ' + cgpa + 'Failure to improve next semster will lead you to road 1 ' 
    }else{
        CGPcomment='please Enter reasonable values'
    }


    $('.resultB').fadeIn()

    document.querySelector('.resultB').textContent= CGPcomment  
    window.localStorage.setItem('CGPcoment', CGPcomment) 
    document.querySelector('.gplist').textContent= container.pushing().GPARR

   })// btn cgpa terminal (A function nested into the BTN GET function)

   container.initialValues()


//=============================SAVING THE INPUTED DATA TO LOCAL STORAGE=====================//
   document.querySelector('.saveData').addEventListener('click', function(){
         container.savingdata();
         $('.saveData').fadeOut()

  })// btn savedata terminal
  
   
})// btn get terminal









//==========================LOADING THE DATA FROM LOCAL STORAGE===============================//
document.querySelector('.loaddata').addEventListener('click', function(){
    totalpointArr= window.localStorage.getItem('tpr')
    totalpointArr= JSON.parse(totalpointArr)
    
    totalunitArr= window.localStorage.getItem('tur')
    totalunitArr= JSON.parse(totalunitArr)
      console.log(totalpointArr, totalunitArr);

     var allcourses= window.localStorage.getItem('courses')
     allcourses= JSON.parse(allcourses)
     
        for(var n=0; n<8; n++){
            document.querySelector(`#cos_${n}`).value = allcourses[n]
        } 
        
     
     
     console.log(allcourses);


      $('.resultB').fadeIn()
      var comment= window.localStorage.getItem('CGPcoment')
      document.querySelector('.resultB').textContent=comment;

     
})//btn load data terminal


//==============================CLEARING DATA FROM LOCAL STORAGE==========================================//
document.querySelector('.cleardata').addEventListener('click', function(){
    window.localStorage.clear()
    $('.resultB').fadeOut()
    document.querySelector('.what').textContent=''

})// btn clear data terminal


//MISSION SUCCESSFUL()