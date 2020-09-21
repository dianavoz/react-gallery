import React from "react";

const Image = props => {
    const {farmID, serverID, id, secret, title} = props;
	  	return (
			<li>
				<img src={`https://farm${farmID}.staticflickr.com/${serverID}/${id}_${secret}.jpg`} alt={title} />
			</li>
	    )
};

export default Image;