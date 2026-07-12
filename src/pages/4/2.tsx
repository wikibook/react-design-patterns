import { Component } from 'react';
import { SearchInputProps, SearchInputState } from './1';

export class SearchInputWithPropsGetter extends Component<
  SearchInputProps,
  SearchInputState
> {
  state = { value: this.props.initialValue || '' };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  getInputProps = ({
    onChange: userOnChange,
    onKeyDown: userOnKeyDown,
    initialValue,
    ...restUserProps
  }: SearchInputProps) => {
    return {
      type: 'text',
      value: this.state.value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        this.handleChange(e);
        if (userOnChange) userOnChange(e);
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
          this.setState({ value: initialValue ?? '' });
        }
        if (userOnKeyDown) userOnKeyDown(e);
      },
      ...restUserProps,
    };
  };

  render() {
    return <input {...this.getInputProps(this.props)} />;
  }
}

export default function Page() {
  return <SearchInputWithPropsGetter placeholder="검색어를 입력하세요" />;
}
