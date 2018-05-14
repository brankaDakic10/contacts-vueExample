

const RULES={
  REQUIRED:'required',
  NUMBER:'number',
  EMAIL:'email'
}
const MESSAGES_CLASSNAME = 'validator-messages'

const removeMessageErrorElement=(element)=>{
  ///remove old message element
  // onemoguci ponavljanje vise required poruka
  // nakon visestrukog submita
  let oldMessageElement=
  // prodji kroz formu
    element.querySelector( `#${MESSAGES_CLASSNAME}`)

  if(oldMessageElement){
    oldMessageElement.remove()
  }
  // dodaje samo 1 poruku nakon submit
  console.log('old',oldMessageElement);
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
        
        
        //   objekat koji ima key,svaki input
        let validationRules=binding.value
        
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
          
          event.preventDefault()
          // console.log(Object.keys(validationRules),'validation Rules')
          
          Object.keys(validationRules).forEach(key => {
            
            // pronadji elem uz pomoc
            let input=element.querySelector( `#${key}`)
            // ubaci esception
            // ukoliko ne postoji input
            if(!input){
              throw new Error(`Element for validation rule ${key}
              not found`)
            }
            
            // da li elem postoji u nizu
            if(validationRules[key].indexOf(RULES.REQUIRED) > -1 &&
            !input.value.length){
              
              let messageElement = document.createElement('div')
              messageElement.id = MESSAGES_CLASSNAME



              //remove old message element
              removeMessageErrorElement(element)
              
              
              
              messageElement.innerHTML=`This field ${key.toUpperCase()} is required`
              // dodajem u formu ukoliko je required
              element.appendChild(messageElement)
              
            }else{
              removeMessageErrorElement(element)
            }
              
              
            
          });
          // event.preventDefault()
        })
      }
      
    })
  }
}

export default MyDirectives