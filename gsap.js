document.addEventListener("DOMContentLoaded", () => {

    const timeline = gsap.timeline()
    timeline

       gsap.fromTo(".pop-up",{
                    y: 20,
                    delay: 1,
                    opacity: 0,
                    duration: 1, }, {

                    y: 0,
                    delay:3.25,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.ln",
                    stagger: 0.05, }
                )

            }




)