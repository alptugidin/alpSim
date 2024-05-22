import irsdk
import time
import sys
import json
ir = irsdk.IRSDK()
try:
#     ir.startup(test_file='C:\\Users\\alptu\\Desktop\\coding\\alpsim\\src\\data.bin')
    ir.startup()
    while True:
        ir.freeze_var_buffer_latest()
        data = {
            "WeekendInfo": ir["WeekendInfo"],
            "SessionInfo": ir["SessionInfo"],
            "QualifyResultsInfo": ir["QualifyResultsInfo"],
            "DriverInfo": ir["DriverInfo"],
            "SplitTimeInfo": ir["SplitTimeInfo"],
            "AirDensity": ir["AirDensity"],
            "AirPressure": ir["AirPressure"],
            "AirTemp": ir["AirTemp"],
            "Brake": ir["Brake"],
            "BrakeRaw": ir["BrakeRaw"],
            "CamCameraNumber": ir["CamCameraNumber"],
            "CamCameraState": ir["CamCameraState"],
            "CamCarIdx": ir["CamCarIdx"],
            "CamGroupNumber": ir["CamGroupNumber"],
            "CarIdxClassPosition": ir["CarIdxClassPosition"],
            "CarIdxEstTime": ir["CarIdxEstTime"],
            "CarIdxF2Time": ir["CarIdxF2Time"],
            "CarIdxGear": ir["CarIdxGear"],
            "CarIdxLap": ir["CarIdxLap"],
            "CarIdxLapCompleted": ir["CarIdxLapCompleted"],
            "CarIdxLapDistPct": ir["CarIdxLapDistPct"],
            "CarIdxOnPitRoad": ir["CarIdxOnPitRoad"],
            "CarIdxPosition": ir["CarIdxPosition"],
            "CarIdxRPM": ir["CarIdxRPM"],
            "CarIdxSteer": ir["CarIdxSteer"],
            "CarIdxTrackSurface": ir["CarIdxTrackSurface"],
            "CarIdxTrackSurfaceMaterial": ir["CarIdxTrackSurfaceMaterial"],
            "Clutch": ir["Clutch"],
            "CpuUsageBG": ir["CpuUsageBG"],
            "DCDriversSoFar"
            "DCLapStatus": ir["DCLapStatus"],
            "DisplayUnits": ir["DisplayUnits"],
            "DriverMarker": ir["DriverMarker"],
            "EngineWarnings": ir["EngineWarnings"],
            "EnterExitReset"
            "FogLevel": ir["FogLevel"],
            "FrameRate": ir["FrameRate"],
            "FuelLevel": ir["FuelLevel"],
            "FuelLevelPct"
            "FuelPress": ir["FuelPress"],
            "FuelUsePerHour"
            "Gear": ir["Gear"],
            "HandbrakeRaw": ir["HandbrakeRaw"],
            "IsDiskLoggingActive": ir["IsDiskLoggingActive"],
            "IsDiskLoggingEnabled"
            "IsInGarage"
            "IsOnTrack": ir["IsOnTrack"],
            "IsOnTrackCar": ir["IsOnTrackCar"],
            "IsReplayPlaying"
            "Lap": ir["Lap"],
            "LapBestLap": ir["LapBestLap"],
            "LapBestLapTime": ir["LapBestLapTime"],
            "LapBestNLapLap": ir["LapBestNLapLap"],
            "LapBestNLapTime"
            "LapCompleted": ir["LapCompleted"],
            "LapCurrentLapTime": ir["LapCurrentLapTime"],
            "LapDeltaToBestLap": ir["LapDeltaToBestLap"],
            "LapDeltaToBestLap_DD": ir["LapDeltaToBestLap_DD"],
            "LapDeltaToBestLap_OK": ir["LapDeltaToBestLap_OK"],
            "LapDeltaToOptimalLap": ir["LapDeltaToOptimalLap"],
            "LapDeltaToOptimalLap_DD": ir["LapDeltaToOptimalLap_DD"],
            "LapDeltaToOptimalLap_OK": ir["LapDeltaToOptimalLap_OK"],
            "LapDeltaToSessionBestLap": ir["LapDeltaToSessionBestLap"],
            "LapDeltaToSessionBestLap_DD": ir["LapDeltaToSessionBestLap_DD"],
            "LapDeltaToSessionBestLap_OK"
            "LapDeltaToSessionLastlLap": ir["LapDeltaToSessionLastlLap"],
            "LapDeltaToSessionLastlLap_DD": ir["LapDeltaToSessionLastlLap_DD"],
            "LapDeltaToSessionLastlLap_OK"
            "LapDeltaToSessionOptimalLap": ir["LapDeltaToSessionOptimalLap"],
            "LapDeltaToSessionOptimalLap_DD": ir["LapDeltaToSessionOptimalLap_DD"],
            "LapDeltaToSessionOptimalLap_OK"
            "LapDist": ir["LapDist"],
            "LapDistPct": ir["LapDistPct"],
            "LapLasNLapSeq": ir["LapLasNLapSeq"],
            "LapLastLapTime": ir["LapLastLapTime"],
            "LapLastNLapTime"
            "LatAccel": ir["LatAccel"],
            "LFcoldPressure"
            "LFshockDefl": ir["LFshockDefl"],
            "LFshockDefl_ST"
            "LFshockVel": ir["LFshockVel"],
            "LFshockVel_ST"
            "LFtempCL": ir["LFtempCL"],
            "LFtempCM": ir["LFtempCM"],
            "LFtempCR"
            "LFwearL": ir["LFwearL"],
            "LFwearM": ir["LFwearM"],
            "LFwearR": ir["LFwearR"],
            "LongAccel": ir["LongAccel"],
            "LRcoldPressure"
            "LRshockDefl": ir["LRshockDefl"],
            "LRshockDefl_ST"
            "LRshockVel": ir["LRshockVel"],
            "LRshockVel_ST"
            "LRtempCL": ir["LRtempCL"],
            "LRtempCM": ir["LRtempCM"],
            "LRtempCR"
            "LRwearL": ir["LRwearL"],
            "LRwearM": ir["LRwearM"],
            "LRwearR": ir["LRwearR"],
            "ManifoldPress"
            "OilLevel": ir["OilLevel"],
            "OilPress"
            "OilTemp": ir["OilTemp"],
            "OkToReloadTextures"
            "OnPitRoad"
            "Pitch": ir["Pitch"],
            "PitchRate": ir["PitchRate"],
            "PitOptRepairLeft"
            "PitRepairLeft"
            "PitSvFlags"
            "PitSvFuel"
            "PitSvLFP": ir["PitSvLFP"],
            "PitSvLRP": ir["PitSvLRP"],
            "PitSvRFP": ir["PitSvRFP"],
            "PitSvRRP": ir["PitSvRRP"],
            "PlayerCarClassPosition": ir["PlayerCarClassPosition"],
            "PlayerCarDriverIncidentCount"
            "PlayerCarIdx": ir["PlayerCarIdx"],
            "PlayerCarMyIncidentCount"
            "PlayerCarPosition": ir["PlayerCarPosition"],
            "PlayerCarTeamIncidentCount"
            "PlayerTrackSurface": ir["PlayerTrackSurface"],
            "PlayerTrackSurfaceMaterial"
            "PushToPass"
            "RaceLaps": ir["RaceLaps"],
            "RadioTransmitCarIdx": ir["RadioTransmitCarIdx"],
            "RadioTransmitFrequencyIdx"
            "RadioTransmitRadioIdx"
            "RelativeHumidity"
            "ReplayFrameNum": ir["ReplayFrameNum"],
            "ReplayFrameNumEnd": ir["ReplayFrameNumEnd"],
            "ReplayPlaySlowMotion"
            "ReplayPlaySpeed": ir["ReplayPlaySpeed"],
            "ReplaySessionNum": ir["ReplaySessionNum"],
            "ReplaySessionTime"
            "RFcoldPressure"
            "RFshockDefl": ir["RFshockDefl"],
            "RFshockDefl_ST"
            "RFshockVel": ir["RFshockVel"],
            "RFshockVel_ST"
            "RFtempCL": ir["RFtempCL"],
            "RFtempCM": ir["RFtempCM"],
            "RFtempCR"
            "RFwearL": ir["RFwearL"],
            "RFwearM": ir["RFwearM"],
            "RFwearR"
            "Roll": ir["Roll"],
            "RollRate"
            "RPM": ir["RPM"],
            "RRcoldPressure"
            "RRshockDefl": ir["RRshockDefl"],
            "RRshockDefl_ST"
            "RRshockVel": ir["RRshockVel"],
            "RRshockVel_ST"
            "RRtempCL": ir["RRtempCL"],
            "RRtempCM": ir["RRtempCM"],
            "RRtempCR"
            "RRwearL": ir["RRwearL"],
            "RRwearM": ir["RRwearM"],
            "RRwearR": ir["RRwearR"],
            "SessionFlags": ir["SessionFlags"],
            "SessionLapsRemain": ir["SessionLapsRemain"],
            "SessionLapsRemainEx"
            "SessionNum": ir["SessionNum"],
            "SessionState"
            "SessionTick": ir["SessionTick"],
            "SessionTime": ir["SessionTime"],
            "SessionTimeRemain"
            "SessionUniqueID"
            "ShiftGrindRPM": ir["ShiftGrindRPM"],
            "ShiftIndicatorPct"
            "ShiftPowerPct"
            "Skies": ir["Skies"],
            "Speed": ir["Speed"],
            "SteeringWheelAngle": ir["SteeringWheelAngle"],
            "SteeringWheelAngleMax": ir["SteeringWheelAngleMax"],
            "SteeringWheelPctDamper": ir["SteeringWheelPctDamper"],
            "SteeringWheelPctTorque": ir["SteeringWheelPctTorque"],
            "SteeringWheelPctTorqueSign": ir["SteeringWheelPctTorqueSign"],
            "SteeringWheelPctTorqueSignStops"
            "SteeringWheelPeakForceNm"
            "SteeringWheelTorque": ir["SteeringWheelTorque"],
            "SteeringWheelTorque_ST"
            "Throttle": ir["Throttle"],
            "ThrottleRaw": ir["ThrottleRaw"],
            "TireLF_RumblePitch": ir["TireLF_RumblePitch"],
            "TireLR_RumblePitch": ir["TireLR_RumblePitch"],
            "TireRF_RumblePitch": ir["TireRF_RumblePitch"],
            "TireRR_RumblePitch"
            "TrackTemp": ir["TrackTemp"],
            "TrackTempCrew"
            "VelocityX": ir["VelocityX"],
            "VelocityY": ir["VelocityY"],
            "VelocityZ": ir["VelocityZ"],
            "VertAccel"
            "Voltage": ir["Voltage"],
            "WaterLevel"
            "WaterTemp": ir["WaterTemp"],
            "WeatherType"
            "WindDir": ir["WindDir"],
            "WindVel"
            "Yaw": ir["Yaw"],
            "YawNorth"
            "YawRate": ir["YawRate"],
        }
        print(json.dumps(data))
        time.sleep(1/int(sys.argv[1]))
        sys.stdout.flush()
except Exception as e:
    print(e)


# print(ir['WeekendInfo']['WeekendOptions'])ü
# print(ir['WeekendInfo'])
# data = {
#     "SessionInfo": ir['SessionInfo'],
#     "WeekendInfo": ir['WeekendInfo'],
#     "Telemetry": {
#         "speed": ir['Speed']
#     }
# }



# while True:
#     ir.freeze_var_buffer_latest()
#     data = {
#         # "SessionInfo": ir['SessionInfo'],
#         # "WeekendInfo": ir['WeekendInfo'],
#         # "Telemetry": {
#         #     "speed": ir['Speed'],
#         #     "CarIdxClass": ir['CarIdxClass'],
#         #     "SessionState": ir['DriverMarker']
#         # }
#         # "DriverInfo": ir['DriverInfo']
#     }

#     print(json.dumps(data))
#     time.sleep(1/int(sys.argv[1]))
#     sys.stdout.flush()
