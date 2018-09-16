import { AxiosError, AxiosResponse } from 'axios';
import { Nav } from 'components/dumb';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode, RefObject } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { audioService, authService, SearchResult } from 'services';
import { Actions, ActionTypes } from 'store/actions';
import { State } from 'store/states';

interface ThisProps {
  audios: Audio[];
  getAudios: () => any;
  searchAudios: (audios: Audio[], query: string) => any;
  upload: (fileUploadInput: HTMLInputElement) => any;
  logout: () => any;
}

const mapState2Props = (state: State): any => {
  return {
    audios: state.audioListState.audios
  };
};

const mapDispatch2Props = (dispatch: Dispatch<ActionTypes>): any => {
  const getAudios = (): void => {
    dispatch(Actions.showSpinner(true));
    audioService.getAll().then((res: AxiosResponse) => {
      dispatch(Actions.getAudios(res.data));
      searchAudios(res.data, '');
      dispatch(Actions.showSpinner(false));
    }).catch((err: AxiosError) => {
      dispatch(Actions.showSpinner(false));
      if (err.response) {
        toast.error('Failed to fetch audios!');
      }
    });
  };
  const searchAudios = (audios: Audio[], query: string): void => {
    audioService.searchAudios(audios, query).then((result: SearchResult) => {
      dispatch(Actions.searchAudios(result));
    });
  };
  const upload = (fileUploadInput: HTMLInputElement): void => {
    fileUploadInput.onchange = (e => {
      if (!fileUploadInput.files) {
        return;
      }
      dispatch(Actions.showSpinner(true));
      audioService.upload(fileUploadInput.files[0]).then((res: AxiosResponse) => {
        getAudios();
        toast.success('Audio uploaded!');
      }).catch((err: AxiosError) => {
        dispatch(Actions.showSpinner(false));
        if (err.response) {
          toast.error('Failed to upload audio!');
        }
      }).then(() => {
        fileUploadInput.value = '';
      });
    });
    fileUploadInput.click();
  };
  const logout = (): void => {
    authService.logout();
    dispatch(Actions.logout());
    dispatch(Actions.getAudios([]));
  };

  return {
    getAudios,
    searchAudios,
    upload,
    logout
  };
};

class NavSmart extends React.Component<ThisProps> {

  private fileUploadRef: RefObject<HTMLInputElement> = React.createRef();

  public constructor(props: ThisProps) {
    super(props);
    this.props.getAudios();
  }

  public render(): ReactNode {
    return (
      <div>
        <Nav onSearchQueryChange={this.handleSearchQueryChange}
             onUploadClick={this.handleUploadClick}
             onLogoutClick={this.handleLogoutClick}
        />
        <input type={'file'}
               style={{display: 'none'}}
               accept={'audio/mpeg'}
               ref={this.fileUploadRef}/>
      </div>
    );
  }

  private handleSearchQueryChange = (e: any): void => {
    this.props.searchAudios(this.props.audios, e.target.value);
  };

  private handleUploadClick = (): void => {
    const fileUploadInput: HTMLInputElement | null = this.fileUploadRef.current;
    if (!fileUploadInput) {
      return;
    }
    this.props.upload(fileUploadInput);
  };

  private handleLogoutClick = (): void => {
    this.props.logout();
  };
}

export default connect(mapState2Props, mapDispatch2Props)(NavSmart);
