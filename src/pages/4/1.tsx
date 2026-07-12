import { Component } from 'react';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  initialValue?: string;
}

export interface SearchInputState {
  value: string;
}

class SearchInput extends Component<SearchInputProps, SearchInputState> {
  state = { value: this.props.initialValue || '' };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        placeholder={this.props.placeholder}
      />
    );
  }
}

export default function Page() {
  return <SearchInput placeholder="검색어를 입력하세요" />;
}
