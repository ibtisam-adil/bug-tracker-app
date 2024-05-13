import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignTicket,
  deleteTicket,
  fetchTicketById,
  markTicketAsCompleted,
} from "../../features/ticket/ticketThunks";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import TicketForm from "./TicketForm";
import { useLocation, useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Ticket = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {
    id: parseInt(location.pathname.split("/").pop()),
  };

  const handleDeleteTicket = () => {
    dispatch(deleteTicket(ticket.id)).then(() => navigate("/tickets"));
  };

  const [isOpenTicket, setIsOpenTicket] = useState(false);

  const { user_type, id: user_id } =
    useSelector((state) => state.auth.user) || {};
  const { isLogin } = useSelector((state) => state.auth) || {};

  const { tickets } = useSelector((state) => state.Ticket);
  const ticket =
    tickets && tickets.length > 0 && tickets.find((ticket) => ticket.id === id);

  useEffect(() => {
    if (!ticket && id && isLogin) {
      dispatch(fetchTicketById(id));
    }
  }, [dispatch, id, ticket, isLogin]);

  return (
    <>
      <div className="project-details-header flex justify-between items-center p-4 px-8 bg-white">
        <h1>Project Details</h1>
        <div>
          <Menu>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Actions
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {user_type === "developer" && (
                  <>
                    {ticket.status && ticket.status === "open" ? (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => dispatch(assignTicket(ticket.id))}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Assign ticket
                          </a>
                        )}
                      </Menu.Item>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              dispatch(markTicketAsCompleted(ticket.id))
                            }
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {ticket.bug_type === "bug"
                              ? "Mark it as Resolved"
                              : "mark it as completed"}
                          </a>
                        )}
                      </Menu.Item>
                    )}
                  </>
                )}
                {user_type === "qa" && (
                  <>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => setIsOpenTicket(true)}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Edit Ticket
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={handleDeleteTicket}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Delete Ticket
                        </a>
                      )}
                    </Menu.Item>
                  </>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      {ticket && ticket !== "undefined" ? (
        <div className="w-screen max-w-[800px] h-[600px] bg-white mt-20 mx-auto rounded-2xl">
          <div className="h-[300px]">
            <img src={ticket.screenshot_url} alt="screenshot" />
          </div>
          <div className="border border-red-300 w-full m-8" />
          <div className="p-8">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <strong>title:</strong>
                <h3 className="p-1">{ticket.title}</h3>
              </div>
              <div className="flex items-center gap-2 px-4 border-2 border-red-700">
                <strong>Status:</strong>
                <p className="text-red-500 bold">{ticket.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <strong>Type:</strong>
              <h3 className="p-1">{ticket.bug_type}</h3>
            </div>

            <div className="flex items-center pb-4 gap-2">
              <strong>Deadline:</strong>
              <h3 className="p-1">{ticket.deadline}</h3>
            </div>
            <strong>Description:</strong>
            <p className="pt-2">{ticket.description}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          {" "}
          <h1>No Ticket found.</h1>
        </div>
      )}
      <TicketForm
        isOpen={isOpenTicket}
        setIsOpen={() => setIsOpenTicket(false)}
        creator_id={user_id}
        ticket={ticket}
        formType={ticket ? "edit" : "create"}
      />
    </>
  );
};

export default Ticket;
