const fileInput = document.getElementById('fileInput');
const uploadButton = document.getElementById('uploadButton');
const shareableLink = document.getElementById('shareableLink');

// up date selected file input
fileInput.addEventListener("change", ()=>{
  const selectedFile = fileInput.files;
  if (selectedFile.length > 0){
    const filenames = Array.form(selectedFile).map((file)=>file.name).join(", ");
    const label = document.querySelector(".custom-file-lab");
    label.innerHTML = filenames;
  }
})


uploadButton.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if(file) {
    try{
      const formData = new FormData();
      formData.append("file", file)
      
      // show loading state
      uploadButton.disabled = true;
      uploadButton.textContent = "sharing...";
      
      const response = await fetch("https://file.io/?expires=1d",{
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      console.log(data);
      
      if(response.ok){
       const link = `<p> Download file <a href="${data.link}" target="_blank">${data.link}</p>` ;
       shareableLink.innerHTML = link;
      }else{
        shareableLink.innerHTML = "file share failed please try again";
      }
    } catch(error){
      shareableLink.textContent = "An error occured";
    } finally{
      uploadButton.disabled = false;
      uploadButton.textContent = "share";
    };
  }else{
    shareableLink.textContent = "please upload a file to share.";
  }''
});