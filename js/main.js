(() => {
  //console.log("IIFE Fired");


  //hamburger menu
  
  const button = document.querySelector('#button');
  const burgerCon = document.querySelector('#burger-con');
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  
	function hamburgerMenu() {
		burgerCon.classList.toggle('slide-toggle');
		button.classList.toggle('expanded');
	};


  button.addEventListener('click', hamburgerMenu, false);
  

  

 //hot spot

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


  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
  });


  //animation
  // const productImage = document.querySelector("#productImage");
  // const productImageTop = productImage.getBoundingClientRect().top;

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    const navLinks = document.querySelectorAll("#main-header nav ul li a");

    function scrollLink(e) {    
            e.preventDefault(); 
            console.log(e.currentTarget.hash);
            let selectedLink = e.currentTarget.hash;
            gsap.to(window, {duration: 1, scrollTo:{y:`${selectedLink}`, offsetY:100 }});
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", scrollLink);
    });

    gsap.to("#productImage",3,
		{scrollTrigger: {
			trigger: "#productImage",
            toggleActions: "restart pause reverse none",
            markers: true,
            start: "top center",
            end:"bottom center"
		}, 
      x: "20%", ease: Bounce.easeOut
		});



  //x-ray


  let imageCon = document.querySelector('#imageCon'),
        drag = document.querySelector('.image-drag'),
        left = document.querySelector('.image-left'),
        dragging = false,
        min = 0,
        max = imageCon.offsetWidth;
    
    
    function onDown() {
        dragging = true;
        // console.log('on down called');
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

  drag.addEventListener('mousedown', onDown);
  document.body.addEventListener('mouseup', onUp);
  document.body.addEventListener('mousemove', onMove);



  //vertical scroll animation

    const canvas = document.querySelector('#explode-view');
    const context = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;


    const frameCount = 265;// how many still frame wdo we have?
    const images = []; //array to hold all of our images

    //object literal, that has a property of frame to hold the current frame
    const buds = {
        frame: 0
    }
//run a for loop to populate our images array


    for (let i = 0; i < frameCount; i++){
        const img = new Image();
        //images/explode_0013.webp
        img.src = `images/images${(i + 1).toString().padStart(4, '0')}.jpg`;
        images.push(img);
    }
    console.table(images);
    //we are not actually animating a dom element, but rather an object
    //which contains a frame count, as the user scrolls we increase the value by 1. we tell greensock there is a total of 449 frames to cycle though, so it know then to stop. greenock scrolling uses decimals, so we use /snap/ to give us thole numbers 1 vs 0.0085.
    gsap.to(buds, {
        frame: 264,
        snap: 'frame',
        scrollTrigger: {
            trigger:'#explode-view',
            pin:true,
            scrub: 1,
            marker: true,
            start: 'top top'

        },
        onUpdate : render
    })
    images[0].addEventListener('onload', render);
    function render() {
        // console.log(buds.frame);
        console.log(images[buds.frame]);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[buds.frame], 0, 0);
}
  


})();

