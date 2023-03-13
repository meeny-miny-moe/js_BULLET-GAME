function menubar(checked_oneroom, checked_apt,checked_housing) {
	if(checked_oneroom==true && checked_apt==false && checked_housing==false){
		document.getElementById("oneroom").style.color = "orange";
		document.getElementById("apt").style.color = "#5ea6c1";
		document.getElementById("housing").style.color = "#5ea6c1";
		//console.log(checked_oneroom,checked_apt,checked_housing)
	}
	else if(checked_oneroom==false && checked_apt==true && checked_housing==false){
		document.getElementById("oneroom").style.color = "#5ea6c1";
		document.getElementById("apt").style.color = "orange";
		document.getElementById("housing").style.color = "#5ea6c1";
		//console.log(checked_oneroom,checked_apt,checked_housing)
	}
	else if(checked_oneroom==false && checked_apt==false && checked_housing==true){
		document.getElementById("oneroom").style.color = "#5ea6c1";
		document.getElementById("apt").style.color = "#5ea6c1";
		document.getElementById("housing").style.color = "orange";
		//console.log(checked_oneroom,checked_apt,checked_housing)
	}
	// console.log(localStorage.getItem("location"));
}
/*클릭했을 때 색상 변경시키기*/
    function colorchange(id) {
        var property = document.getElementById(id);
        if ( property.style.color=="orange") {
            property.style.color = "#5ea6c1";
			console.log(property.style.color);
          //  count = 1;        
        }
        else {
            property.style.color = "orange";
          
        }
    }
