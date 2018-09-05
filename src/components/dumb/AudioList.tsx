import 'components/dumb/AudioList.css';
import { AudioListSpinner } from 'components/dumb/AudioListSpinner';
import { Audio } from 'models';
import * as React from 'react';
import { ReactNode } from 'react';

interface ThisProps {
  audios: Audio[];
  activeAudio: Audio;
  spinner: boolean;
  onItemPlayClick: (audio: Audio) => any;
}

export class AudioList extends React.Component<ThisProps> {

  private static DEFAULT_TITLE: string = 'Unknown Title';
  private static DEFAULT_AUTHOR: string = 'Unknown Author';

  constructor(props: ThisProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      this.props.spinner ?
        <AudioListSpinner/> :
        <div className={'content-wrapper'}>
          <div className={'content-wrapper current-wrapper flex'}>
            <img src={'http://localhost:8080/api/audio/cover/1534688744719-64710b67-4cec-4be0-94d0-7faf3dbc18b2'}/>
            <div>
              <h2>{}</h2>
            </div>
          </div>
          <div className={'audio-list-wrapper'}>
            <div className={'audio-list'}>
              {this.renderAudios()}
            </div>
          </div>
        </div>
    );
  }

  private renderAudios = (): ReactNode => {
    return this.props.audios.map((audio: Audio) => (
      <div key={audio.id} className={'audio-wrapper'}>
        <span className={'left-outline'}/>
        <div className={'audio p20 flex'}>
          <button className={'item-play'} onClick={this.handleItemPlayClick.bind(this, audio)}>
            <i className={'far fa-play-circle'}/>
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

  private getDuration = (audio: Audio): string => {
    if (!audio.duration) {
      return '0:00';
    }
    const duration: number = audio.duration;
    const minutes: number = Math.floor(duration / 60);
    const seconds: number = duration % 60;
    return `${minutes}:${seconds.toString()}`;
  };

  private handleItemPlayClick = (audio: Audio, e: any): any => {
    e.target.closest('.audio-wrapper').classList.add('active');
    const currentI: Element = e.target.closest('.audio').querySelector('i');
    currentI.classList.toggle('fa-play-circle');
    currentI.classList.toggle('fa-pause-circle');
    document.querySelectorAll('.audio-wrapper').forEach((node: Element) => {
      const i: Element = node.querySelector('.item-play i')!;
      if (i === currentI) {
        return;
      }
      node.classList.remove('active');
      i.classList.remove('fa-pause-circle');
      i.classList.add('fa-play-circle');
    });
    this.props.onItemPlayClick(audio);
  };
}
