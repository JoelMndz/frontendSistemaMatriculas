
export const convertToBase64 = (file:File|null) => new Promise((resolve, reject)=>{
  if(!file){
    resolve(null);
    return;
  }
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64 = reader.result!.toString();
    resolve(base64.split(',')[1])
  };
  reader.onerror = error => reject(error);
  reader.readAsDataURL(file);
});