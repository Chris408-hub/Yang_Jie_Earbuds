(() => {
  //console.log("IIFE Fired");
  //variables
  const button = document.querySelector('#button');
	const burgerCon = document.querySelector('#burger-con');
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const infoBoxes = [
    {
      title: "Left-Right Identification",
      text: "Easily distinguish between the left and right sides of the headphones to ensure correct positioning for optimal audio quality.",
      image: "images/left.jpg"
    },
    {
      title: "Playback Control & Volume Adjustment",
      text: "This multifunctional hotspot allows you to pause playback with a single press and adjust the volume by pressing and holding. It provides seamless control over your audio experience.",
      image: "images/button.jpg"
    },
    {
      title: "Headphone Unit",
      text: " The headphone unit itself serves as the core of your audio experience, delivering high-quality sound and comfortable wear.",
      image: "images/earbud.jpg"
    },
        {
      title: "Earphone Caps",
      text: "The Earphone Caps are removable and customizable, allowing you to personalize your headphones with different designs or materials to suit your style.",
      image: "images/cap.jpg"
    }

  ]


  //functions

//hamburger menu
	function hamburgerMenu() {
		burgerCon.classList.toggle('slide-toggle');
		button.classList.toggle('expanded');
	};



//hot spot
  function modelLoaded() {
    console.log(hotspots);
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      let h2 =document.createElement("h2");
      h2.textContent = infoBox.title;


      let p = document.createElement("p");
      p.textContent = infoBox.text;

      let img = document.createElement("img");
      img.src = infoBox.image;
      

      selected.appendChild(h2);
      selected.appendChild(p);
      selected.appendChild(img);
      
    })
  }
  loadInfo();

  function showInfo() {
    //console.log(this.slot);
    //console.log(`#${this.slot}`);
    //since the slot value matches the id value I can use the slot value as a selector to get to the div I want.
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    //console.log(this.slot);
    //console.log(`#${this.slot}`);
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

//x-ray
  let imageCon = document.querySelector('#imageCon'),
        drag = document.querySelector('.image-drag'),
        left = document.querySelector('.image-left'),
        dragging = false,
        min = 0,
        max = imageCon.offsetWidth;
    
    
    function onDown() {
        dragging = true;
        console.log('on down called');
    }

    function onUp() {
        dragging = false;
    }

    function onMove(event) {
        if (dragging === true) {
            let x = event.clientX - imageCon.getBoundingClientRect().left;
     
            if (x < min) {
                x = min;
            } else if (x > max) {
                x = max-10;
                
            }
            drag.style.left = x + 'px';
            left.style.width = x + 'px';
        }

        
        
    }
    
  //event listeners
  
//x-ray
  drag.addEventListener('mousedown', onDown);
  document.body.addEventListener('mouseup', onUp);
  document.body.addEventListener('mousemove', onMove);
  
//hamburger menu
  button.addEventListener('click', hamburgerMenu, false);

  //hot spot
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
  });


})();

// In this version, the event listeners use regular functions instead of arrow functions, so the "this" keyword inside the event listeners will refer to the DOM element that triggered the event.