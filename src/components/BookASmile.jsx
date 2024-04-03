import React from "react";

function BookSmile() {
    return (
        <React.Fragment>
            <div className="bg-grey">
                <div className="position-absolute bookSmile">
                    <div className="text-white">
                        #BookMyShowCares.
                    </div>
                </div>
                <div className="row">
                    <img src="https://in.bmscdn.com/webin/static/book-a-smile/showcase/banner11.jpg" alt="Book A Smile" className="img-fluid" />
                </div>

                <div className="bg-danger my-5 mx-4">
                    <div className="smileInfo">Where Is Your Rupee Going?</div>
                    <div className="text-center">
                        <span className="fa-stack fa-2x mx-5 mb-5">
                            <i className="fas fa-circle fa-stack-2x white"></i>
                            <i className="fa fa-camera-retro fa-stack-1x thinIcon"></i>
                        </span>

                        <span className="fa-stack fa-2x mx-5 mb-5">
                            <i className="fas fa-circle fa-stack-2x white"></i>
                            <i className="fa fa-facebook fa-stack-1x thinIcon"></i>
                        </span>
                        <span className="fa-stack fa-2x mx-5 mb-5">
                            <i className="fas fa-circle fa-stack-2x white"></i>
                            <i className="fa fa-youtube-play fa-stack-1x thinIcon"></i>
                        </span>
                        <span className="fa-stack fa-2x mx-5 mb-5">
                            <i className="fas fa-circle fa-stack-2x white"></i>
                            <i className="fa fa-twitter fa-stack-1x thinIcon"></i>
                        </span>
                    </div>
                </div>


            </div>
        </React.Fragment>
    )
}
export default BookSmile