const products = [
 {id:1,name:"Riverflash Spinner",category:"Lures",price:6.99,tag:"BESTSELLER",desc:"A compact spinner for covering water.",img:"https://images.unsplash.com/photo-1535392432937-a27c36ec07b5?auto=format&fit=crop&w=700&q=80"},
 {id:2,name:"Predator Crankbait",category:"Lures",price:8.50,tag:"NEW",desc:"A hard bait for a confident retrieve.",img:"https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=80"},
 {id:3,name:"Coastal Jig Set",category:"Lures",price:12.99,tag:"FIELD PICK",desc:"Versatile profiles for changing conditions.",img:"https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=700&q=80"},
 {id:4,name:"Ready Rig Pack",category:"Terminal",price:4.99,tag:"ESSENTIAL",desc:"Keep a few dependable rigs close at hand.",img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80"},
 {id:5,name:"Tackle Utility Pouch",category:"Accessories",price:14.99,tag:"ORGANISE",desc:"A practical place for the small stuff.",img:"https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=700&q=80"},
 {id:6,name:"Bank Essentials Kit",category:"Accessories",price:19.99,tag:"SESSION READY",desc:"A demo bundle for your everyday carry.",img:"https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=700&q=80"}
];
let cart = [];
let activeFilter = "All";
const $ = (s) => document.querySelector(s);
const money = (n) => "£" + n.toFixed(2);

function renderProducts(){
 const shown = products.filter(p => activeFilter === "All" || p.category === activeFilter);
 $("#productCount").textContent = `${shown.length} PRODUCT${shown.length===1?"":"S"}`;
 $("#productGrid").innerHTML = shown.map(p => `
  <article class="product-card">
   <div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span><button class="quick-add" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div>
   <div class="product-info"><span class="product-category">${p.category.toUpperCase()}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="product-price"><span>${money(p.price)}</span><small>DEMO PRODUCT</small></div></div>
  </article>`).join("");
 document.querySelectorAll("[data-add]").forEach(btn => btn.addEventListener("click", () => addToCart(Number(btn.dataset.add))));
}
function addToCart(id){const existing=cart.find(i=>i.id===id);if(existing)existing.qty++;else cart.push({id,qty:1});renderCart();showToast("Added to your bag");}
function changeQty(id,delta){const item=cart.find(i=>i.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(i=>i.id!==id);renderCart();}
function renderCart(){
 const count=cart.reduce((n,i)=>n+i.qty,0), total=cart.reduce((n,i)=>n+products.find(p=>p.id===i.id).price*i.qty,0);
 $("#cartCount").textContent=count;$("#drawerCount").textContent=count;$("#cartTotal").textContent=money(total);
 $("#cartItems").innerHTML=cart.length?cart.map(i=>{const p=products.find(p=>p.id===i.id);return `<div class="cart-item"><img src="${p.img}" alt=""><div><strong>${p.name}</strong><small>${money(p.price)} each</small><div class="quantity-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Remove one">−</button><span>${i.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Add one">+</button></div></div><span class="cart-item-price">${money(p.price*i.qty)}</span></div>`}).join(""):'<p class="empty-cart">Your bag is empty. Time to find your next favourite.</p>';
 document.querySelectorAll("[data-qty]").forEach(btn=>btn.addEventListener("click",()=>changeQty(Number(btn.dataset.qty),Number(btn.dataset.delta))));
}
function openCart(){document.body.classList.add("cart-open");$("#cartDrawer").setAttribute("aria-hidden","false");}
function closeCart(){document.body.classList.remove("cart-open");$("#cartDrawer").setAttribute("aria-hidden","true");}
let toastTimer;function showToast(msg){$("#toast").textContent=msg;$("#toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("#toast").classList.remove("show"),1900);}
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{activeFilter=btn.dataset.filter;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));renderProducts();}));
document.querySelectorAll(".collection-card").forEach(card=>card.addEventListener("click",()=>{activeFilter=card.dataset.filter;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===activeFilter));renderProducts();}));
$("#cartOpen").addEventListener("click",openCart);$("#cartClose").addEventListener("click",closeCart);$("#cartBackdrop").addEventListener("click",closeCart);
$("#checkoutButton").addEventListener("click",()=>showToast("Demo checkout isn't connected yet."));
$("#menuToggle").addEventListener("click",()=>{const nav=$("#mainNav");const open=nav.classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open));});
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}));
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("#newsletterMessage").textContent="Demo form only — connect an email platform before launch.";});
$("#year").textContent=new Date().getFullYear();
renderProducts();renderCart();
