import 'components/dumb/AudioList.css';
import { AudioListSpinner } from 'components/dumb/AudioListSpinner';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';
import { audioService } from 'services';

interface ThisProps {
  audios: Audio[];
  activeAudio: Audio;
  spinner: boolean;
  onActivePlayClick: () => any;
  onItemPlayClick: (audio: Audio, e: any) => any;
}

export class AudioList extends React.Component<ThisProps> {

  private static DEFAULT_TITLE: string = 'Unknown Title';
  private static DEFAULT_AUTHOR: string = 'Unknown Author';
  private static DEFAULT_COVER_ART: string = 'img/cover_art.png';

  constructor(props: ThisProps) {
    super(props);
  }

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
          <div className={this.props.activeAudio.id ? 'controls flex' : ' controls flex disabled'}>
            <div className={'control-buttons'}>
              <button>
                <i className={'far fa-comment'}/>
              </button>
              <button>
                <i className={'fas fa-random'}/>
              </button>
              <button>
                <i className={'fas fa-redo'}/>
              </button>
              <button onClick={this.props.onActivePlayClick}>
                <i className={this.props.activeAudio.playing ? 'fas fa-pause' : 'fas fa-play'}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  private renderAudios = (): ReactNode => {
    return this.props.audios.map((audio: Audio) => (
      <div key={audio.id} className={audio.playing || audio.id === this.props.activeAudio.id ?
        'audio-wrapper active' : 'audio-wrapper'}>
        <span className={'left-outline'}/>
        <div className={'audio p20 flex'}>
          <button className={'item-play'} onClick={this.props.onItemPlayClick.bind(this, audio)}>
            <i className={audio.playing ? 'far fa-pause-circle' : 'far fa-play-circle'}/>
          </button>
          <div className={'audio-header pl20 pr20 flex-a'}>
            <h3>{this.getTitleOrDefault(audio)}<p>{this.getAuthorOrDefault(audio)}</p></h3>
          </div>
          <div className={'audio-options flex-m'}>
            <p>{this.getDuration(audio)}</p>
            <button>
              <i className={'fas fa-ellipsis-v'}/>
            </button>
          </div>
        </div>
      </div>
    ));
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
    return `${minutes}:${seconds.toString()}`;
  };
}
