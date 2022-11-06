import { Pagination } from 'antd';
import React from 'react';
import styled from 'styled-components';

interface PageNumbersProps {
  total: number;
  defaultPageSize: number;
  defaultCurrent: number;
  pageSizeOptions: string[];
  onChange: (page: number, pageSize: number) => void;
}
const PageNumbers: React.FC<PageNumbersProps> = ({ ...props }) => {
  return (
    <StyledPagination
      total={props.total}
      defaultPageSize={props.defaultPageSize}
      defaultCurrent={props.defaultCurrent}
      pageSizeOptions={props.pageSizeOptions}
      onChange={props.onChange}
    />
  );
};

const StyledPagination = styled(Pagination)`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 40px 0;

  & > li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    min-width: 3rem;
    font-size: 1.2rem;
  }

  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    font-size: 1.2rem;
    align-items: center;
    height: 3rem;
  }
  & > li .ant-select-dropdown {
    left: 0px !important;
    top: calc(-7rem + 3px) !important;
  }
`;
export default PageNumbers;
