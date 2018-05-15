import validator from 'validator'

const RULES={
  REQUIRED:'required',
  NUMBER:'number',
  EMAIL:'email'
}
const MESSAGES_CLASSNAME = 'validator-messages'

const removeMessageErrorElements=(element)=>{
  ///remove old message elements
  // onemoguci ponavljanje vise required poruka
  // nakon visestrukog submita
  let oldMessageElements=
  // prodji kroz formu
   element.querySelectorAll( `#${MESSAGES_CLASSNAME}`)
    // idemo kroz kolekciju i brisemo je
   oldMessageElements.forEach((oldMessageElement)=>{
     oldMessageElement.remove()
   })
  
 
  // dodaje samo 1 poruku nakon submit
  // console.log('old',oldMessageElement);
}


// dodaj metodu da ne dupliram code

const showMessageErrorElement=(element,message)=>{
  let messageElement = document.createElement('div')
  messageElement.id = MESSAGES_CLASSNAME
  
  messageElement.innerHTML=message
  // dodajem u formu ukoliko je input polje required
  element.appendChild(messageElement)
  
}



const MyDirectives={
  install:function(Vue){
    Vue.directive('focusOn',{
      
      inserted: function(element){
        element.focus()
        //    console.log('xxx',element,binding,vnode,oldnode)
      }
    })
    
    // Vue.mixin({
    //     mounted:function(){
    //         console.log(this.$el)
    //     }
    // })
    
    // directive for email
    //  v-validate:reqired.email
    Vue.directive('validate',{
      inserted: function(element,binding){
        console.log(binding.value)
        
        //   objekat koji ima key,svaki input
        let validationConfig=binding.value
        let validationRules=validationConfig.validationRules
     
        //  ukoliko je arg--polje obavezno
        let isRequired = binding.arg === RULES.REQUIRED
        
        // element.addEventListener('input',(event)=>{
        //     // console.log(event, event.target.value, 'value')
        //      var value=event.target.value
        //     if(isRequired && !event.length){
        //     console.log('Field is required',event.target.name)
        //     }
        // })
        
        //   console.log(validationRules,'validation rules')
        
        console.log('event',event,validationRules)
        
        element.addEventListener('submit',(event)=>{
          let  errorCounter = 0
          event.preventDefault()
          // console.log(Object.keys(validationRules),'validation Rules')
          
          Object.keys(validationRules).forEach(key => {
            
            // pronadji elem uz pomoc
            let input=element.querySelector( `#${key}`)
            // ubaci exception
            // ukoliko ne postoji input
            if(!input){
              throw new Error(`Element for validation rule ${key}
              not found`)
            }
            
            //  izvuci ovo pravilo 
             //remove old message element
             removeMessageErrorElements(element)


            // prolazi kroz pravila

            console.log(validationRules[key],
              validationRules[key].indexOf(RULES.EMAIL)> -1,
              validator.isEmail(input.value)
            )
            //////////
            if(validationRules[key].indexOf(RULES.EMAIL)> -1 && 
            !validator.isEmail(input.value) ){
              /////
              errorCounter++
              showMessageErrorElement(
                element,
                `This field must be email`
              )
              
            }
            // da li elem postoji u nizu
            if(validationRules[key].indexOf(RULES.REQUIRED) > -1 &&
            !input.value.length){
              errorCounter++
             
              showMessageErrorElement(
                element,
                `This field ${key.toUpperCase()} is required`
              )
              
            }
            
            
            
          });
          // event.preventDefault()

          if(errorCounter == 0){
            validationConfig.submitCallBack()

          }
        })
      }
      
    })
  }
}

export default MyDirectives