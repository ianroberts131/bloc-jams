var animatePoints = function() {
                
    var points = document.getElementsByClassName('point');
    
    var revealPoint = function(index) {
        points[index].style.opacity = 1;
        points[index].style.transform = "rotate(360deg)";
        points[index].style.msTransform = "rotate(360deg)";
        points[index].style.WebkitTransform = "rotate(360deg)";
    };
    
    for (var i = 0; i < points.length; i++) {
        revealPoint(i);
    };
    
};