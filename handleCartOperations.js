const addToCart = async (id) => {
  console.log(id);
  const data = await fetch(`ROOMS.json`);
  const result = await data.json();
  const { name, summary, property_type, images,number_of_reviews,price,_id} = result.find((item) => item._id == id);
  const cartItems= getItemsFromStorage();
  // console.log('from cartItems----', cartItems);
  
  if(cartItems.find(item => item._id == id)){
    return
  }

  cartItems.push({ name, summary, property_type, images,number_of_reviews,price,_id});
  // console.log('after push',cartItems);
  localStorage.setItem('savedCart', JSON.stringify(cartItems))
  //const cartItemsContainer = document.getElementById("cart-items");
  displayCartItems()
};

const getItemsFromStorage = () => {
  let itemsArray = [];
  const cartItems = localStorage.getItem("savedCart");
  if (cartItems) {
    itemsArray = JSON.parse(cartItems);
  }
  return itemsArray;
};



const displayCartItems=()=>{
    const cartItemsContainer = document.getElementById("cart-items");
    const cartItems=getItemsFromStorage()
    cartItemsContainer.innerHTML=""
    cartItems?.forEach((item)=>{
        const { name, property_type, images,number_of_reviews,price,_id}=item
        cartItemsContainer.innerHTML += `
        <tr>
        <th scope="row">${name.slice(0,26)}</th>
        <td><span> <i onclick='deleteItemFromCart(${_id})' class="mx-2 bi bi-trash3 text-danger"></i>
        </span> 
        <span> 
        <i class="text-success bi bi-credit-card-fill" onclick='handlePaymentInfo(${_id})' data-bs-toggle="modal" data-bs-target="#paymentModal" ></i> 
        </span></td>
       
        </tr>
       
        `
    })
   
}
// displayCartItems()

const deleteItemFromCart=(id)=>{
    const cartItems=getItemsFromStorage()
    const filteredItems=cartItems.filter((item)=>item._id != id)
    localStorage.setItem('savedCart', JSON.stringify(filteredItems))
    displayCartItems()
}
