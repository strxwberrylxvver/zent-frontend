import "./Modal.css";
import { useState } from "react";
import PropTypes from "prop-types";

export function Modal({ show, title, children }) {
  return show ? (
    <div className="ModalOverlay">
      <div className="ModalPane">
        <header>
          <p>{title}</p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  ) : null;
}

export function useModal(isOpen, initialContent = null) {
  const [state, setState] = useState({ show: isOpen, content: initialContent });

  const open = (content) => setState({ show: true, content });
  const close = () => setState({ ...state, show: false });

  return [state.show, state.content, open, close];
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
