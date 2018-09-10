import { AudioListSpinner } from 'components/dumb';
import 'components/dumb/AudioList.css';
import { PlaybackSmart } from 'components/smart';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import { audioService, SearchRecord, SearchResult } from 'services';

interface ThisProps {
  audios: Audio[];
  searchResult: SearchResult
  activeAudio: Audio;
  spinner: boolean;
  activeLyrics: {visible: boolean, audio: Audio}
  editMode: boolean;
  editAudio: Audio;
  onItemPlayClick: (audio: Audio, e: any) => any;
  onItemDeleteClick: (audio: Audio) => any;
  onLyricsWrapperShow: (audio: Audio) => any;
  onLyricsWrapperHide: () => any;
  onEditWrapperShow: (audio: Audio) => any;
  onEditWrapperHide: () => any;
  onEditTitleChange: (e: any) => any;
  onEditAuthorChange: (e: any) => any;
  onEditLyricsChange: (e: any) => any;
  onEditAudioSave: () => any;
}

export class AudioList extends React.Component<ThisProps> {

  private static DEFAULT_TITLE: string = 'Unknown Title';
  private static DEFAULT_AUTHOR: string = 'Unknown Author';
  private static DEFAULT_COVER_ART: string = 'img/cover_art.png';

  public render(): ReactNode {
    return (
      <div className={'content-wrapper'}>
        {this.renderActiveAudio()}
        {this.props.spinner ?
          <AudioListSpinner/> :
          <div className={'audio-list-wrapper'}>
            <div className={'audio-list'}>
              {this.renderAudios()}
            </div>
          </div>
        }
        {this.renderLyricsWrapper()}
        {this.renderEditWrapper()}
      </div>
    );
  }

  private renderActiveAudio = (): ReactNode => {
    return (
      <div className={'content-wrapper current-wrapper flex'}>
        <img src={this.getCoverArtOrDefault(this.props.activeAudio)}/>
        <div className={'current p20 flex-col flex-b'}>
          <h2>
            {this.props.activeAudio.id ? this.getTitleOrDefault(this.props.activeAudio) : ''}
            <p>{this.props.activeAudio.id ? this.getAuthorOrDefault(this.props.activeAudio) : ''}</p>
          </h2>
          <PlaybackSmart/>
        </div>
      </div>
    );
  };

  private renderAudios = (): ReactNode => {
    return this.props.searchResult.records.map((record: SearchRecord) => {
      const audio: Audio = this.props.audios[record.index];
      if (!audio) {
        return;
      }
      return (
        <div key={audio.id} className={audio.playing || audio.id === this.props.activeAudio.id ?
          'audio-wrapper active' : 'audio-wrapper'}>
          <span className={'left-outline'}/>
          <div className={'audio p20 flex'}>
            <button className={'item-play'} onClick={this.props.onItemPlayClick.bind(this, audio)}>
              <i className={audio.playing ? 'far fa-pause-circle' : 'far fa-play-circle'}/>
            </button>
            <div className={'audio-header pl20 pr20 flex-a'}>
              {this.renderItemHeader(audio, record)}
            </div>
            <div className={'audio-options flex-m'}>
              <p>{this.getDuration(audio)}</p>
              <button onClick={this.props.onLyricsWrapperShow.bind(this, audio)}>
                <i className={'far fa-comment'}/>
              </button>
              <button onClick={this.props.onEditWrapperShow.bind(this, audio)}>
                <i className={'fas fa-edit'}/>
              </button>
              <button onClick={this.props.onItemDeleteClick.bind(this, audio)}>
                <i className={'fas fa-times'}/>
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  private renderItemHeader = (audio: Audio, record: SearchRecord): ReactNode => {
    const title: string = this.getTitleOrDefault(audio);
    const author: string = this.getAuthorOrDefault(audio);
    if (record.start === record.end) {
      return <h3>{title}<p>{author}</p></h3>;
    }
    const highlightTitle = (): ReactNode => (
      <h3>
        {title.slice(0, record.start)}
        <span>{title.slice(record.start, record.end)}</span>
        {title.slice(record.end)}
        <p>{author}</p>
      </h3>
    );
    const highlightAuthor = (): ReactNode => (
      <h3>
        {title}
        <p>
          {author.slice(0, record.start)}
          <span>{author.slice(record.start, record.end)}</span>
          {author.slice(record.end)}
        </p>
      </h3>
    );
    return record.inTitle ? highlightTitle() : highlightAuthor();
  };

  private renderLyricsWrapper = (): ReactNode => {
    return (
      <div className={'wrapper lyrics-wrapper'}
           style={{display: this.props.activeLyrics.visible ? 'flex' : 'none'}}
           onClick={this.hideLyricsWrapper}>
        <div className={'form lyrics'}>
          <div className={'form-header flex-b p20'}>
            <p>{this.getTitleOrDefault(this.props.activeLyrics.audio)}</p>
            <button onClick={this.hideLyricsWrapper}>
              <i className={'fas fa-times'}/>
            </button>
          </div>
          <div className={'form-body p20'}>
            <p>
              {
                this.props.activeLyrics.audio.lyrics ?
                  this.props.activeLyrics.audio.lyrics :
                  <span>No lyrics found...</span>
              }
              </p>
          </div>
          <div className={'form-footer flex p20'}>
            <button onClick={this.hideLyricsWrapper}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  private renderEditWrapper = (): ReactNode => {
    return (
      <div className={'wrapper edit-wrapper'}
           style={{display: this.props.editMode ? 'flex' : 'none'}}
           onClick={this.hideEditWrapper}>
        <div className={'form edit'}>
          <div className={'form-header flex-b p20'}>
            <p>Edit Audio</p>
            <button onClick={this.hideEditWrapper}>
              <i className={'fas fa-times'}/>
            </button>
          </div>
          <div className={'form-body p20'}>
            <div className={'form-input mb20'}>
              <input type={'text'}
                     placeholder={'Title'}
                     value={this.props.editAudio.title}
                     onChange={this.props.onEditTitleChange}/>
            </div>
            <div className={'form-input mb20'}>
              <input type={'text'}
                     placeholder={'Author'}
                     value={this.props.editAudio.author}
                     onChange={this.props.onEditAuthorChange}/>
            </div>
            <div className={'form-input'}>
              <textarea placeholder={'Lyrics'}
                        value={this.props.editAudio.lyrics}
                        onChange={this.props.onEditLyricsChange}/>
            </div>
          </div>
          <div className={'form-footer flex p20'}>
            <button className={'cancel-btn'} onClick={this.hideEditWrapper}>Cancel</button>
            <button className={'submit-btn ml20'} onClick={this.saveEditForm}>Save</button>
          </div>
        </div>
      </div>
    );
  };

  private getTitleOrDefault = (audio: Audio): string => {
    return audio.title ? audio.title : AudioList.DEFAULT_TITLE;
  };

  private getAuthorOrDefault = (audio: Audio): string => {
    return audio.author ? audio.author : AudioList.DEFAULT_AUTHOR;
  };

  private getCoverArtOrDefault = (audio: Audio): string => {
    return audio.coverArtName ? audioService.getCoverArtUrl(audio.coverArtName) : AudioList.DEFAULT_COVER_ART;
  };

  private getDuration = (audio: Audio): string => {
    if (!audio.duration) {
      return '0:00';
    }
    const duration: number = audio.duration;
    const minutes: number = Math.floor(duration / 60);
    const seconds: number = duration % 60;
    const secondsString: string = seconds > 9 ? seconds.toString() : `0${seconds}`;
    return `${minutes}:${secondsString}`;
  };

  private hideLyricsWrapper = (e: any): void => {
    const tagName: string = e.target.tagName.toLowerCase();
    if (e.target.classList.contains('lyrics-wrapper') || tagName === 'button' || tagName === 'i') {
      this.props.onLyricsWrapperHide();
    }
  };

  private hideEditWrapper = (e: any): void => {
    const tagName: string = e.target.tagName.toLowerCase();
    if (e.target.classList.contains('edit-wrapper') || tagName === 'button' || tagName === 'i') {
      this.props.onEditWrapperHide();
    }
  };

  private saveEditForm = (): void => {
    this.props.onEditAudioSave();
    this.props.onEditWrapperHide();
  };
}
