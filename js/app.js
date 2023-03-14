const modal = document.getElementById("modalSHow");
const valueSarch = document.getElementById("search-field");

const loadPhones = async (searchText, dataLimit) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  toggleSpinner(false);
  displayPhone(data.data, dataLimit);
};

const displayPhone = (allPhones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  const showAll = document.getElementById("show-all");
  if (dataLimit && allPhones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  allPhones.map((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                
            </div>
        </div>
        `;
    phonesContainer.appendChild(phoneDiv);
    toggleSpinner(false);
  });
};

const searchPhone = () => {
  loadPhones(valueSarch.value);
  toggleSpinner(false);
  valueSarch.value = "";
};

valueSarch.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    toggleSpinner(true);
    loadPhones(valueSarch.value);
    valueSarch.value = "";
  }   
});

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// const displayPhones = (phones) => {
//   const phonesContainer = document.getElementById("phones-container");
//   phonesContainer.textContent = "";
//   // display 10 phones only
//   const showAll = document.getElementById("show-all");
//   if (dataLimit && phones.length > 10) {
//     phones = phones.slice(0, 10);
//     showAll.classList.remove("d-none");
//   } else {
//     showAll.classList.add("d-none");
//   }

//   // display no phones found
//   const noPhone = document.getElementById("no-found-message");
//   if (phones.length === 0) {
//     noPhone.classList.remove("d-none");
//   } else {
//     noPhone.classList.add("d-none");
//   }
//   // display all phones
//   phones.map((phone) => {
//     const phoneDiv = document.createElement("div");
//     phoneDiv.classList.add("col");
//     phonesContainer.innerHTML = `
//         <div class="card p-4">
//             <img src="${phone.images}" class="card-img-top" alt="...">
//             <div class="card-body">
//                 <h5 class="card-title">${phone.phone_name}</h5>
//                 <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//                 <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>

//             </div>
//         </div>
//         `;
//     phonesContainer.appendChild(phoneDiv);
//   });
//   // stop spinner or loader
// //   toggleSpinner(false);
// };

// const processSearch = (dataLimit) => {
//   toggleSpinner(true);
//   const searchField = document.getElementById("search-field");
//   const searchText = searchField.value;
//   loadPhones(searchText, dataLimit);
// };

// // handle search button click
// document.getElementById("btn-search").addEventListener("click", function () {
//   // start loader
//   processSearch(10);
// });

// // search input field enter key handler
// document
//   .getElementById("search-field")
//   .addEventListener("keypress", function (e) {
//     if (e.key === "enter") {
//       processSearch(10);
//     }
//   });

// const toggleSpinner = (isLoading) => {
//   const loaderSection = document.getElementById("loader");
//   if (!isLoading) {
//     loaderSection.classList.remove("d-none");
//   } else {
//     loaderSection.classList.add("d-none");
//   }
// };

// // not the best way to load show All

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
  console.log(data.data);
};

const displayPhoneDetails = (phone) => {
  console.log(phone.others);
  const modalTittle = document.getElementById("exampleModalLabel");
  modalTittle.innerText = phone.name;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <p>Release Date: ${phone.releaseDate}</p>
    <p>Storage: ${phone.mainFeatures.memory}</p>
    <p>Others: ${
      phone.others ? phone.others.Bluetooth : "No Bluetooth Information"
    }</p>
    <p>Sensor: ${
      phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : "no sensor"
    }</p>
    
    `;
};
const data1 = true;
loadPhones("apple", data);
