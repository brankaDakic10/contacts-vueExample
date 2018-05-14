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
        const RULES={
          REQUIRED:'required',
          NUMBER:'number',
          EMAIL:'email'
        }
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
          
          Object.keys(validationRules).forEach(key => {
            // da li elem postoji u nizu
            if(  validationRules[key].indexOf(RULES.REQUIRED)> -1){
              
              let messageElement = document.createElement('div')
              messageElement.innerHTML=`This field ${key.toUpperCase()} is required`
              // dodajem u formu ukoliko je required
              element.appendChild(messageElement)
              
            }
          });
          event.preventDefault()
        })
      }
      
    })
  }
}

export default MyDirectives