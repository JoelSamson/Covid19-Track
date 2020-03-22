import React, { Component } from "react";
import PropTypes from "prop-types";

import FaqSection from "./FaqSection";

class DropFaq extends Component {
  static propTypes = {
    allowMultipleOpen: PropTypes.bool,
    children: PropTypes.instanceOf(Object).isRequired
  };

  static defaultProps = {
    allowMultipleOpen: false
  };

  constructor(props) {
    super(props);

    const openSections = {};

    this.props.children.forEach(child => {
      if (child.props.isOpen) {
        openSections[child.props.label] = true;
      }
    });

    this.state = { openSections };
  }

  onClick = label => {
    const {
      props: { allowMultipleOpen },
      state: { openSections }
    } = this;

    const isOpen = !!openSections[label];

    if (allowMultipleOpen) {
      this.setState({
        openSections: {
          ...openSections,
          [label]: !isOpen
        }
      });
    } else {
      this.setState({
        openSections: {
          [label]: !isOpen
        }
      });
    }
  };

  render() {
    const {
      onClick,
      props: { children },
      state: { openSections }
    } = this;

    return (
      <div style={{ border: "2px solid #008f68" }}>
        {children.map(child => (
          <FaqSection
            isOpen={!!openSections[child.props.label]}
            label={child.props.label}
            onClick={onClick}
          >
            {child.props.children}
          </FaqSection>
        ))}
      </div>
    );
  }
}

export default DropFaq;
