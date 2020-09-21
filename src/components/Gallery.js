import React from "react";

import Image from "./Image";
import NoResults from "./NoResults";

const Gallery = (props) => {

  const pictures = props.data;
  let photos;

  if(pictures.length > 0){
    photos =pictures.map(photo => 
    <Image 
        farmID={photo.farm} 
        serverID={photo.server}
        id={photo.id}
        secret={photo.secret}
        title={photo.title}
        key={photo.id}
    />
);
}else {
  // If array is empty, display NotFound component
  photos = <NoResults />
};
    
  return (
    <div className="photo-container">
      <h2>{props.title}</h2>
      <ul>
        {photos}
      </ul>  
    </div>
  );
};
    
export default Gallery;