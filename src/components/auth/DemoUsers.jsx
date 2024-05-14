import { Fragment } from "react"; 
import { Dialog, Transition } from "@headlessui/react";
import PropTypes from "prop-types";

const DemoUsers = ({isOpen ,setIsOpen}) => {
  return (
    <div>
       <Transition show={isOpen} as={Fragment}>
        <Dialog
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel>
              <div className="max-w-[400px] bg-white p-12">
    <div className="logo-head">
      <i className="bx bxs-bug" />
      <h2 className="heading">Demo-User Login</h2>
    </div>
    <div className="Users">
      <div className="user admin">
        <img src='./manager.jpeg' alt="admin" className="user-img" />
        <p>Project Manager</p>
      </div>
      <div className="user dev">
        <img src='./dev.jpeg' alt="dev" className="user-img" />
        <p>Developer</p>
      </div>
      <div className="user qa">
        <img src='./qa.jpeg' alt="admin" className="user-img" />
        <p>QA</p>
      </div>
    </div>
  </div>
                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

DemoUsers.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
}

export default DemoUsers;

