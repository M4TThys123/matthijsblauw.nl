<template>
 <header>
   <nav>
     <div class="personal__logo">Matthijs Blauw</div>

     <ul class="nav__link--list">
       <li>
         <a href="/" class="nav__link--anchor link__hover-effect link__hover-effect--black">Technologie</a>
       </li>
       <li>
         <a href="#projects" class="nav__link--anchor link__hover-effect link__hover-effect--black">Projecten</a>
       </li>
       <li>
         <a href="mailto:matthijs.blauw@gmail.com" class="nav__link--anchor nav__link--anchor-primary">Contact</a>
       </li>
     </ul>
   </nav>
 </header>
</template>

<script>
export default {
  name: "NavComponent"
}
</script>

<style scoped>

.blur{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background 0.5s, backdrop-filter 0.5s;
}

/* NAVIGATION BAR */
nav{
  height: 100px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
}

.nav__link--anchor{
  margin: 0 12px;
  color: #242424;
  text-decoration: none;
  font-weight: 700;
}

.nav__link--list{
  display: flex;
}

.nav__link--anchor-primary{
  background-color: var(--color-blue);
  padding: 8px 20px;
  border-radius: 50px;
  color: white;
  transition: all 300ms ease;
}

.nav__link--anchor-primary:hover{
  background-color: #14539A;
}

.personal__logo{
  font-size: 24px;
  color: var(--color-blue);
  margin: 0 12px;
  font-weight: bold;
}
</style>