import React from "react";
import { useState } from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import { EuiFlexGroup, EuiFlexItem, EuiButton, EuiFormRow, EuiFieldText, EuiComboBox, EuiSelect } from "@elastic/eui";
import { labels, sortOptions } from "./CuisineList";

export default ({ updateData }) => {
  const [search, setSearch] = useState(null);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const onChange = (selectedOptions) => {
    setSelectedCuisines(selectedOptions);
  };

  const handleSubmit = () => {
    if (search) {
      updateData(search, selectedCuisines, selectedSort);
    } else window.alert("Enter a city to search.");
  };
  return (
    <div style={{ width: "75%", margin: "auto" }}>
      <EuiFlexGroup style={{ maxWidth: 600 }}>
        <EuiFlexItem>
          <EuiFormRow
            onChange={(e) => {
              handleChange(e);
            }}
            label="City"
            value={search}
            helpText="Enter a city name to start searching"
          >
            <EuiFieldText />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFormRow hasEmptyLabelSpace>
            <EuiButton onClick={handleSubmit}>Search</EuiButton>
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiComboBox
        placeholder="Select cuisine options"
        options={labels}
        selectedOptions={selectedCuisines}
        onChange={onChange}
        isClearable={true}
        data-test-subj="demoComboBox"
      />
      <EuiSelect
        options={sortOptions}
        value={selectedSort}
        onChange={(e) => setSelectedSort(parseInt(e.target.value))}
        aria-label="Use aria labels when no actual label is in use"
      />
    </div>
  );
};
