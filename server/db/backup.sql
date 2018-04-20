INSERT INTO `Section` (`isOpen`, `section`, `name`) VALUES
  (0, NULL, 'Off-Topics'),
  (0, NULL, 'Programming'),
  (0, 2,    'Web'),
  (1, 3,    'Javascript'),
  (1, 2,    'Node.js'),
  (1, 2,    'Java'),
  (1, 2,    'C/C++'),
  (1, 2,    'Python'),
  (1, 2,    'Ruby');

INSERT INTO `User` (`timestamp`, `salt`, `password`, `username`, `permLevel`) VALUES
  ('2018-03-27 18:19:02', 0x016268AF4FCF8E8A45C3A9A9DE5328C4F539BEDF191B318B9360E4F7FD067D015165DF27FB87042BA01880E34708D8B8A10B3D8F1537FF5F8ABEEEF357C433C8, 0x9FCA01BB4F2C7495D1ED739722205EE6045A8B0256584F74EDFCEBA5CD8E85EF0E29CC0C714F3A5883DD21739A61C8545A70584A73786D9260A1AB219D3B6DAC, 'Vinicius G', 0),
  ('2018-03-27 19:31:40', 0x016268F1D0A305101FEF4516B487F6AA82964D8DBDE1D28A18435AA12CBE019A94DEE6AC1D468D32F8B9F098A8744C869F985B064D22BB068B5236C36110207E, 0x96DA6A5CC7217579478596856F459D7AF1E9324882004E0FBCA3F8B5B19B49014C7E4FDB860BEDE982D2AE3206D65AFDC0B049FD4BA5DDE7371C84B1A71BB144, 'Mescouleur', 0);

INSERT INTO `Token` (`hash`, `account`, `timestamp`, `expires`, `type`, `isActive`) VALUES
  (0x2A802CA92DFD4043A56A98BDE6A26B76F3D96F67DA7431A77A5D9A0FBC3FD235, 2, '2018-03-27 19:31:40', '2018-04-03 19:31:40', 0, 0),
  (0x9A167F3913A3E637CF7B94773FEABC7A41E9EA1BDE1FE6D750FA19BF1CCE341E, 2, '2018-03-27 21:24:17', '2018-04-03 21:24:17', 0, 1),
  (0xB965A06794F6971B748D89B2E330B83BD9E6D19EE0E1C469B11FF97EA6E8FA14, 1, '2018-03-27 18:19:02', '2018-04-03 18:19:02', 0, 1);