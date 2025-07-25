import {
  Appointment01Icon,
  UserMultiple03Icon,
  CheckListIcon,
  User02Icon,
  Message01Icon,
} from "@hugeicons/core-free-icons";

export const tabItems = [
  {
    text: "Book Now",
    icon: Appointment01Icon,
    link: "/",
  },
  {
    text: "Far Fable",
    icon: UserMultiple03Icon,
    link: "/farfable",
  },
  {
    text: "My Booking",
    icon: CheckListIcon,
    link: "/mybooking",
  },
  {
    text: "Notification",
    icon: Message01Icon,
    link: "/notification",
  },
  {
    text: "Profile",
    icon: User02Icon,
    link: "/profile/:id",
  },
];
