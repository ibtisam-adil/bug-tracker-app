import { useDispatch, useSelector } from "react-redux";
import NewCollaboratorForm from "./NewCollaboratorForm";
import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { removeUserFromProject } from "../../features/project_tickets/projectTicketThunks";

const ProjectCollaborators = ({ project_id, user_type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state.ProjectTicket.projecttickets?.collaborators || []
  );

  const collaborators = useMemo(() => data, [data]);

  return (
    <>
      <div className="bg-[#F7F8FB] m-8">
        <h3 className="text-3xl text-center p-4">Collaborators</h3>
        {user_type === "manager" && (
          <div className="text-end px-8 pb-4">
            <button onClick={() => setIsOpen(true)} className="btn">
              Add Collaborator
            </button>
          </div>
        )}
        <div className="collaborators">
          <table className="styled-table" style={{ tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "33%" }} />
              <col style={{ width: "33%" }} />
              <col style={{ width: "33%" }} />
            </colgroup>

            <thead>
              <tr>
                <th>Role</th>
                <th>Name</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {collaborators.length > 0 &&
                collaborators.map((collaborator) => (
                  <tr key={collaborator.id}>
                    <td className="project-name">{collaborator.name}</td>
                    <td style={{ width: "65%" }}>{collaborator.user_type}</td>
                    {user_type === "manager" && collaborator.user_type !== "manager" && (
                      <td>
                        <button
                          onClick={() =>
                            dispatch(
                              removeUserFromProject({
                                project_id,
                                id: collaborator.id,
                              })
                            )
                          }
                          className="text-red-500 border-b-2 border-red-500"
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <NewCollaboratorForm
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(false)}
        projectId={project_id}
      />
    </>
  );
};

ProjectCollaborators.propTypes = {
  project_id: PropTypes.number.isRequired,
    user_type: PropTypes.string.isRequired,
};

export default ProjectCollaborators;
