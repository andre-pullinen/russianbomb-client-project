import Pusher from "pusher-js";

const pusher = new Pusher("c7e515cbecdbb1ce06ab", {
  cluster: "eu",
  encrypted: true,
  authEndpoint: "https://bumz.online/broadcasting/auth"
});

export default pusher;
