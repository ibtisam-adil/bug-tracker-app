// import { useEffect, useState } from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProjects } from "../../features/projects/projectThuncks";
// import ProjectForm from "./ProjectForm";
// import { NavLink } from "react-router-dom";
// import "./project.css";
// import SearchBar from "./SearchBar";
// import SearchRezultList from "./SearchRezultList";

// const Project = () => {
//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState(false);

//   const { projects, error, loading } = useSelector((state) => state.Project);
//   const { user_type } = useSelector((state) => state.auth.user) || {};
//   const { isLogin } = useSelector((state) => state.auth) || {};

//   const [rezult, setRezult] = useState([]);

//   useEffect(() => {
//     if (isLogin) {
//       dispatch(fetchProjects());
//     }
//   }, [dispatch, isLogin]);

//   const renderSkeletonRows = () => {
//     const skeletonRows = [];
//     for (let i = 0; i < 5; i++) {
//       skeletonRows.push(
//         <tr key={i}>
//           <td colSpan="4">
//             <Skeleton />
//           </td>
//         </tr>
//       );
//     }
//     return skeletonRows;
//   };

//   return (
//     <>
//       <section className="projects-section">
//         <h1 className="dashboard-header">Dashboard</h1>
//         <div className="w-[150px]">
//         <SearchBar  setRezult={setRezult}/>
//         </div>
//         <div className="projects">
//           <div className="project-page">
//             <h3> Projects </h3>
//             {user_type && user_type === "manager" && (
//               <button
//                 onClick={() => setIsOpen(true)}
//                 className="btn new-project"
//                 to="/projects/new"
//               >
//                 Create Project
//               </button>
//             )}
//           </div>
//           <div className="table-body">
//             <table className="styled-table">
//               <thead>
//                 <tr>
//                   <th>Project</th>
//                   <th>Description</th>
//                   <th>Collaborator</th>
//                   <th>Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {error && (
//                   <tr>
//                     <td colSpan="4">{error}</td>
//                   </tr>
//                 )}
//                 {loading && renderSkeletonRows()}
//                 {!error &&
//                   !loading &&
//                   projects &&
//                   projects.map((project) => (
//                     <tr key={project.id}>
//                       <td className="project-name">{project.name}</td>
//                       <td style={{ width: "65%" }}>{project.description}</td>
//                       <td>Muneeb</td>
//                       <td>
//                         <NavLink
//                           className="btn"
//                           to={`/projects/${project.id}`}
//                           state={{ id: project.id }}
//                         >
//                           Details
//                         </NavLink>
//                       </td>
//                     </tr>
//                   ))}
//                 {!error && !loading && projects.length === 0 && (
//                   <tr>
//                     <td colSpan="4">There are no projects.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <ProjectForm
//           isOpen={isOpen}
//           setIsOpen={() => setIsOpen(false)}
//           title="Create New Project"
//         />
//       </section>
//     </>
//   );
// };

// export default Project;

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../features/projects/projectThuncks";
import ProjectForm from "./ProjectForm";
import { NavLink } from "react-router-dom";
import "./project.css";
import SearchBar from "./SearchBar";
import SearchRezultList from "./SearchRezultList";

const Project = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { projects, error, loading } = useSelector((state) => state.Project);
  const { user_type } = useSelector((state) => state.auth.user) || {};
  const { isLogin } = useSelector((state) => state.auth) || {};

  const [rezult, setRezult] = useState([]);
  const [searchError , setSearchError] = useState(false)
  console.log(searchError)

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchProjects());
    }
  }, [dispatch, isLogin]);

  const filteredProjects = projects.filter((project) =>
  rezult.some((r) => project.name.toLowerCase().includes(r.toLowerCase()))
);


  const renderSkeletonRows = () => {
    const skeletonRows = [];
    for (let i = 0; i < 5; i++) {
      skeletonRows.push(
        <tr key={i}>
          <td colSpan="4">
            <Skeleton />
          </td>
        </tr>
      );
    }
    return skeletonRows;
  };

  return (
    <>
      <section className="projects-section">
        <h1 className="dashboard-header">Dashboard</h1>
        <div className="w-[150px]">
        <SearchBar  setRezult={setRezult} setSearchError={setSearchError}/>
        <SearchRezultList rezult={rezult} />
        </div>
        <div className="projects">
          <div className="project-page">
            <h3> Projects </h3>
            {user_type && user_type === "manager" && (
              <button
                onClick={() => setIsOpen(true)}
                className="btn new-project"
                to="/projects/new"
              >
                Create Project
              </button>
            )}
          </div>
          <div className="table-body">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Description</th>
                  <th>Collaborator</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {error && (
                  <tr>
                    <td colSpan="4">{error}</td>
                  </tr>
                )}
                {loading && renderSkeletonRows()}
                {!error &&
                  !loading &&
                  (rezult.length === 0 ? projects : filteredProjects).map(
                    (project) => (
                    <tr key={project.id}>
                      <td className="project-name">{project.name}</td>
                      <td style={{ width: "65%" }}>{project.description}</td>
                      <td>Muneeb</td>
                      <td>
                        <NavLink
                          className="btn"
                          to={`/projects/${project.id}`}
                          state={{ id: project.id }}
                        >
                          Details
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                {!error && !loading && projects.length === 0 && (
                  <tr>
                    <td colSpan="4">There are no projects.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ProjectForm
          isOpen={isOpen}
          setIsOpen={() => setIsOpen(false)}
          title="Create New Project"
        />
      </section>
    </>
  );
};

export default Project;
