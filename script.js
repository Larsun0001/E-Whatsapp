const splashScreen = document.querySelector("#splash_screen");
const displayMessage = document.querySelector("#display-message");
const chatSection = document.querySelector("#chat_section");
const backBtn = document.querySelector("#back-btn");
const phoneName = document.querySelector("#phone_name");
const phoneImg = document.querySelector("#phone_img");
const messageBox = document.querySelector("#message-box");
const sendBtn = document.querySelector("#send-btn");
const micBtn = document.querySelector("#mic-btn");
const emptyMessage = document.querySelector("#empty-message");
const showChats = document.querySelector("#show-chats");
let initialUser = 0;

const users = [
  {
    id: 0,
    userName: "Samuel Perry",
    img: "assets/img11.jpg",
    chats: [],
  },
  {
    id: 1,
    userName: "Maya Lee",
    img: "assets/img1.jpg",
    chats: [],
  },
  {
    id: 2,
    userName: "Omar Johnson",
    img: "assets/img2.jpg",
    chats: [],
  },
  {
    id: 3,
    userName: "Evelyn Bennett",
    img: "assets/img3.jpg",
    chats: [],
  },
  {
    id: 4,
    userName: "Liam Hernandez",
    img: "assets/img4.jpg",
    chats: [],
  },
  {
    id: 5,
    userName: "Chloe Patel",
    img: "assets/img5.jpg",
    chats: [],
  },
  {
    id: 6,
    userName: "Benjamin Garcia",
    img: "assets/img6.jpg",
    chats: [],
  },
  {
    id: 7,
    userName: "Sophia Miller",
    img: "assets/img7.jpg",
    chats: [],
  },
  {
    id: 8,
    userName: "Ethan Jones",
    img: "assets/img8.jpg",
    chats: [],
  },
  {
    id: 9,
    userName: "Ava Walker",
    img: "assets/img9.jpg",
    chats: [],
  },
  {
    id: 10,
    userName: "Noah Young",
    img: "assets/img10.jpg",
    chats: [],
  },
];

const randomMessages = [
  "How are you?",
  "What are your plans for the day?",
  "Have you ever tried skydiving?",
  "Do you prefer coffee or tea?",
  "Tell me about your favorite book.",
  'What"s the last movie you watched?',
  "If you could travel anywhere right now, where would you go?",
  'What"s your favorite season?',
  "Do you have any pets?",
  'What"s your favorite type of music?',
  'What"s the most adventurous thing you"ve ever done?',
  'What"s your favorite hobby?',
  "Are you a morning person or a night owl?",
  'What"s the best piece of advice you"ve ever received?',
  'What"s your favorite food?',
  "If you could meet any historical figure, who would it be?",
  'What"s your dream job?',
  'What"s something you"ve always wanted to learn?',
  'What"s your favorite way to relax?',
  "Do you enjoy cooking?",
  'What"s your favorite color?',
  'What"s the last dream you remember having?',
  "Do you believe in aliens?",
  'What"s your biggest fear?',
  'What"s the most beautiful place you"ve ever been?',
  "If you could have any superpower, what would it be?",
  'What"s the best gift you"ve ever received?',
  'What"s your favorite childhood memory?',
  'What"s your go-to comfort food?',
  'What"s the craziest thing you"ve ever done?',
  "Do you believe in destiny?",
  'What"s your favorite holiday?',
  'What"s your favorite type of weather?',
  'What"s your favorite board game?',
  'What"s your favorite TV show?',
  'What"s the last song you listened to?',
  "If you could live in any time period, when would it be?",
  'What"s your favorite thing about yourself?',
  'What"s the last thing that made you laugh?',
  'What"s the best place you"ve ever visited?',
  'What"s your favorite ice cream flavor?',
  'What"s the most interesting fact you know?',
  "Do you prefer mountains or beaches?",
  'What"s the most important quality in a friend?',
  'What"s the best book you"ve read recently?',
  'What"s your favorite type of movie?',
  "If you could only eat one food for the rest of your life, what would it be?",
  'What"s your favorite app on your phone?',
];

const screenWidth = window.innerWidth;
const hideSplash = () => {
  splashScreen.style.display = "none";
};

setTimeout(hideSplash, 3000);

// Shorten Text
const shortenString = (text, maxLength = 10) => {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - 3) + "...";
};

const displayUSer = (user = users) => {
  displayMessage.innerHTML = user
    .map((mem) => {
      let { id, userName, img, chats } = mem; // Destructuring with semicolon
      let lastVal = chats.length - 1;

      return `
          <div class="min-h-10 flex justify-between px-2 py-2 hover:bg-lightBack cursor-pointer" data-id=${id}>
            <div class="flex gap-4 items-center">
              <div class="h-12 w-12 rounded-full overflow-hidden">
                <img src="${img}" alt="" class="w-full h-full">
              </div>
              <div class="flex flex-col">
                <h1 class="text-lg font-bold text-slate-950">${userName}</h1>
                <p class="text-slate-600 flex items-center gap-1 text-xs"><span><i class='bx bx-check-double bx-sm'></i></span>Start Chatting</p>
              </div>
            </div>
            <div class="flex flex-col justify-between items-center">
              <p class="text-mainColor text-xs">Online</p>
            </div>
          </div>
        `; // Return the entire template literal
    })
    .join("");
};
const formatTime12Hours = (date = new Date()) => {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Pad minutes with leading 0 if needed

  // Adjust for 12-hour format and AM/PM indicator
  let adjustedHours = hours % 12;
  adjustedHours = adjustedHours ? adjustedHours : 12; // Handle 00 hours as 12 AM
  const ampm = hours >= 12 ? "pm" : "am";

  return `${adjustedHours}:${minutes} ${ampm}`;
};

// Example usage
const currentTime = formatTime12Hours();

const displayAllMessages = (chats) => {
  if (chats.length > 0) {
    emptyMessage.style.display = "none";
    showChats.style.display = "flex";

    const chatElements = chats.map((chat) => {
      const messageClass =
        chat.type === "sender"
          ? "bg-chatColor w-[80%] px-4 py-3 mb-3 self-end lg:w-[60%]"
          : "bg-white w-[80%] px-4 py-3 mb-3 self-start lg:w-[60%]";

      return `
          <div class="${messageClass}">
            <div>
              <p>${chat.msg}</p>
            </div>
            <div>
              <p class="text-right text-xs text-slate-500">${chat.date}</p>
            </div>
          </div>
        `;
    });

    showChats.innerHTML = chatElements.join("");
  } else {
    emptyMessage.style.display = "flex";
    showChats.style.display = "none";
  }
};
const getRandomMessage = () => {
  let randomMessage = Math.floor(Math.random() * randomMessages.length);
  return randomMessages[randomMessage];
};

// Sending MEssage
sendBtn.addEventListener("click", () => {
  const typedValue = messageBox.value;
  const checkedUser = users.find((user) => user.id === initialUser);
  if (typedValue.length > 0) {
    let userMessage = {
      type: "sender",
      msg: typedValue,
      date: formatTime12Hours(),
    };
    checkedUser.chats.push(userMessage);
    displayAllMessages(checkedUser.chats);
    messageBox.value = "";
    setTimeout(() => {
      let compMsg = {
        type: "receiver",
        msg: getRandomMessage(),
        date: formatTime12Hours(),
      };
      checkedUser.chats.push(compMsg);
      displayAllMessages(checkedUser.chats);
    }, 1000);
  } else {
    return;
  }
});

const displayPhoneDetails = (id = initialUser) => {
  let newUser = users.filter((user) => user.id === id);
  const { userName, img, chats } = newUser[0];
  displayAllMessages(chats);
  phoneName.textContent = userName;
  phoneImg.src = img;
};

const openChat = () => {
  Array.from(displayMessage.children).forEach((user) => {
    let btnId = parseInt(user.dataset.id);
    user.addEventListener("click", () => {
      chatSection.style.display = "block";
      initialUser = btnId;
      displayPhoneDetails(btnId);
    });
  });
};

// Hide phone size page
backBtn.addEventListener("click", () => {
  chatSection.style.display = "";
});

const showChat = () => {
  if (screenWidth > 700) {
    chatSection.style.display = "block";
  }
};

// Messagebox eventlistener
messageBox.addEventListener("keyup", () => {
  const typedValue = messageBox.value;
  const typedLength = typedValue.length;

  if (typedLength > 0) {
    sendBtn.style.display = "block";
    micBtn.style.display = "none";
  } else {
    sendBtn.style.display = "none";
    micBtn.style.display = "block";
  }
});

displayUSer();
openChat();
displayPhoneDetails();
window.addEventListener("resize", showChat);
