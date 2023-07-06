/*
Author: Emre EKE
Date: 2023-04-03T07:26:06.514Z
*/
import { View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import Modal from 'react-native-modal';

interface Props { }
interface State {
  loading: boolean;
  progress: number;
}
class Loading extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      progress: 0,
    };
  }
  componentDidMount() {
    Loading.Instance = this;
  }
  componentDidUpdate() { }
  componentWillUnmount() { }
  static Instance: Loading;
  static show(loading: boolean, progress?: number) {
    Loading?.Instance?.setState({ loading, progress: progress || 0 });
  }
  static progress(progress: number) {
    Loading?.Instance?.setState({ progress });
  }
  render() {
    return (
      <Modal
        isVisible={this.state.loading}
        style={{
          backgroundColor: 'transparent'
        }}
      // modalStyle={{ backgroundColor: 'transparent' }}
      // overlayBackgroundColor={'rgba(0,0,0,0.6)'}

      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'transparent',
          }}>
          {this.state.progress !== 0
            ?
            <Progress.Circle
              showsText={this.state.progress !== 0}
              indeterminate={this.state.progress === 0}
              size={90}
              progress={
                this.state.progress !== 0 ? this.state.progress / 100 : undefined
              }
              color={"#1A7AFC"}
              thickness={10}
              formatText={() =>
                this.state.progress !== 0 ? `${this.state.progress}%` : ""
              }
            />
            :
            <Progress.Circle
              borderWidth={5}
              indeterminate
              size={90}
              color="#1A7AFC"
              fill="#00000000"
              thickness={10}
            />
          }
        </View>
      </Modal>
    );
  }
}
export default Loading;