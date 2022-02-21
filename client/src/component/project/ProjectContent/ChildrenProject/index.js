import ChildProject from "./ChildProject";
import { ListGroup } from "react-bootstrap";

const ChildrenProject = ({ children }) => {
  return (
    <div className="d-flex justify-content-end">
      <ListGroup as="ol" className="project-children-list col-8" numbered>
        {children.map((child) => (
          <ListGroup.Item
            as="li"
            key={child._id}
            className="project-children-list-item "
          >
            <ChildProject child={child} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};
export default ChildrenProject;
