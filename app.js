
//Connect to contentful
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "3uw5a72ud2hx",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "lz7MSNLnH_nIUULJ1I_wSu4DFlwZ2sr1t2cNS0xF1rE"
});


// select items
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");



// load initial item
window.addEventListener("DOMContentLoaded", function () {
  const information = new Info();
  information.getInfo().then(item => { 
   img.src = item[0].img;
   author.textContent = item[0].name;
   job.textContent = item[0].job;
  info.textContent = item[0].desc;
})
 
});

//Get data specific to aboutMe from Contentful
class Info {
  async getInfo(){
      try{
        let contentful = await client
              .getEntries({
                  content_type : "aboutMe"
              })

          let services = contentful.items;

          services  =  services.map(item => {
                      const{name,job,desc} = item.fields;
                      const{id} = item.sys;
                      const img = item.fields.image.fields.file.url;
                      return {name,job,desc,id,img}
                  })
          return services;
      }
      catch(error){
          console.log(error)
      }
      
    }
  } 