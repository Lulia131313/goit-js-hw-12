export function createMarkup(arr) {
  return arr
    .map(photo => {
      return `<li class="gallery-item">
       <a href="${photo.largeImageURL}">
    <img src='${photo.largeImageURL}' alt='${photo.tags}' class='gallery-img' /></a>
    <div class = "gallery-section">
    <p class="gallery-text">Like<span class= "value">${photo.likes}</span></p>
   <p class="gallery-text">Views<span class= "value">${photo.views}</span></p>
    <p class="gallery-text">Comments<span class= "value">${photo.comments}</span></p>
     <p class="gallery-text">Downloads<span class= "value">${photo.downloads}</span></p>
     
    </li>`;
    })
    .join('');
}
