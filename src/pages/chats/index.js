// project import
import MainCard from 'components/MainCard';
import {
  Paper,
  Box,
  Tab,
  Tabs,
  Divider,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Fab
} from '@mui/material';
import { SendOutlined } from '@ant-design/icons';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';
import { closeSupportChat, getConnectionMessages, getSupportMessages, sendSupportMessage } from 'services/chatService';
import PageLoader from 'components/PageLoader';
import { dateConverter2, serviceError } from 'utils/helper';
import { useSelector } from 'react-redux';
import pusher from 'utils/pusher';

// ==============================|| Chat PAGE ||============================== //

const Chats = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const listRef = useRef(null);
  const clistRef = useRef(null);

  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [reload, setReload] = useState(false);
  const [message, setMessage] = useState('');

  const [supportChat, setSupportChat] = useState([]);
  const [supportChatToDisplay, setSupportChatToDisplay] = useState([]);

  const [connectionChat, setConnectionChat] = useState([]);
  const [connectionChatMessages, setConnectionChatMessages] = useState([]);
  const [connectionChatToDisplay, setConnectionChatToDisplay] = useState([]);

  const [selectedSupportChatId, setSelectedSupportChatId] = useState(0);
  const [selectedSupportChatMessages, setSelectedSupportChatMessages] = useState([]);

  const [selectedConnectionChatId, setSelectedConnectionChatId] = useState(0);
  const [selectedConnectionChatMessages, setSelectedConnectionChatMessages] = useState([]);

  useEffect(() => {
    if (tabValue === 0) {
      try {
        const supportChatChannel = pusher.subscribe(`private-support.${selectedSupportChatId}`);
        supportChatChannel.bind('App\\Events\\SupportMessageNotification', (data) => {
          if (data.message.isAdmin === false) {
            const supportChatState = [...supportChat];
            const index = supportChatState.findIndex((item) => item.id === selectedSupportChatId);

            supportChatState[index].messages.push(data.message);
            setSupportChat(supportChatState);
            setSupportChatToDisplay(supportChatState);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue, selectedSupportChatId]);

  useEffect(() => {
    if (tabValue === 1) {
      try {
        const connectionChatChannel = pusher.subscribe(`private-chat.${selectedConnectionChatId}`);
        connectionChatChannel.bind('App\\Events\\NewChatMessage', (data) => {
          if (data.message.isAdmin === false) {
            const connectionChatState = [...selectedConnectionChatMessages];
            connectionChatState.push(data.message);
            setSelectedConnectionChatMessages(connectionChatState);

            setConnectionChatMessages([...connectionChatMessages, data.message]);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue, selectedConnectionChatId]);

  const filterChats = (chatList, query) => {
    return chatList.filter((chat) => {
      const userTitle = [chat.title, chat.user.name].join(' ');
      const bodies = chat.messages.map((m) => m.body).join(' ');

      const searchString = `${userTitle} ${bodies}`;

      return searchString.toLowerCase().includes(query.toLowerCase());
    });
  };

  const onSearch = (value) => {
    setSupportChatToDisplay(filterChats(supportChat, value));
  };

  const filterConnectionChats = (chatList, query) => {
    return chatList.filter((chat) => {
      const user = [chat.user1.name, chat.user2.name].join(' ');
      const searchString = `${user}`;

      return searchString.toLowerCase().includes(query.toLowerCase());
    });
  };

  const onConnectionSearch = (value) => {
    setConnectionChatToDisplay(filterConnectionChats(connectionChat, value));
  };

  const fetchSupportChat = async () => {
    setIsLoading(true);
    try {
      const result = await getSupportMessages();
      if (result.status === 200) {
        setSupportChat(result.data.data);
        setSupportChatToDisplay(result.data.data);

        if (result.data.data.length > 0) {
          setSelectedSupportChatId(result.data.data[0].id);
          setSelectedSupportChatMessages(result.data.data[0].messages);
        }
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsLoading(false);
  };

  const fetchConnectionChat = async () => {
    setIsLoading(true);
    try {
      const result = await getConnectionMessages();
      if (result.status === 200) {
        setConnectionChatToDisplay(result.data.data.chats);
        setConnectionChat(result.data.data.chats);
        setConnectionChatMessages(result.data.data.messages);

        if (result.data.data.chats.length > 0) {
          setSelectedConnectionChatId(result.data.data.chats[0].id);
          const selectedMessages = getConnectionChatMessage(result.data.data.messages, result.data.data.chats[0].id);
          setSelectedConnectionChatMessages(selectedMessages);
        }
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSupportChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    fetchConnectionChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getConnectionChatMessage = (chats, chatId) => {
    return chats.filter((obj) => obj.supportMessageId === chatId);
  };

  const handleMessageSelect = (id) => {
    setMessage('');
    setSelectedSupportChatId(id);
    const supportChatIndex = supportChat.findIndex((x) => x.id === id);
    setSelectedSupportChatMessages(supportChat[supportChatIndex].messages);
  };

  const handleConnectionMessageSelect = (id) => {
    setMessage('');
    setSelectedConnectionChatId(id);
    const selectedMessages = getConnectionChatMessage(connectionChatMessages, id);
    setSelectedConnectionChatMessages(selectedMessages);
  };

  const handleTabChange = (event, newValue) => {
    setMessage('');
    setTabValue(newValue);
  };

  const handleChatClose = async (id) => {
    setIsClosing(true);
    try {
      const result = await closeSupportChat(id);
      if (result.status === 200) {
        setReload((prev) => !prev);
        dispatch(setAlertMessage({ alertMessage: 'Chat Closed' }));
        dispatch(setAlertType({ alertType: 'success' }));
        dispatch(setShowAlert({ showAlert: true }));
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsClosing(false);
  };

  const sendMessage = async (isSupportMessage) => {
    if (message === '') {
      return;
    }
    setIsSending(true);
    try {
      const chatId = isSupportMessage ? selectedSupportChatId : selectedConnectionChatId;
      const payload = {
        id: chatId,
        message: message,
        isSupportMessage: isSupportMessage
      };
      const randomId = Math.floor(Math.random() * (10000 - 100)) + 100;

      const pendingSupportMessage = {
        id: randomId,
        supportMessageId: chatId,
        senderId: profile.id,
        body: message,
        isMedia: false,
        createdAt: '...',
        isAdmin: true,
        messageStatus: 'Pending'
      };
      let supportChatState;
      let connectionChatState;

      if (isSupportMessage) {
        supportChatState = [...supportChat];
        const index = supportChatState.findIndex((item) => item.id === selectedSupportChatId);

        supportChatState[index].messages.push(pendingSupportMessage);
        setSupportChat(supportChatState);
        setSupportChatToDisplay(supportChatState);
      } else {
        connectionChatState = [...selectedConnectionChatMessages];
        connectionChatState.push(pendingSupportMessage);
        setSelectedConnectionChatMessages(connectionChatState);
      }
      setMessage('');

      const result = await sendSupportMessage(payload);
      if (result.status === 200) {
        dispatch(setAlertMessage({ alertMessage: 'Message sent' }));
        dispatch(setAlertType({ alertType: 'success' }));
        dispatch(setShowAlert({ showAlert: true }));

        if (isSupportMessage) {
          const index = supportChatState.findIndex((item) => item.id === selectedSupportChatId);
          const objectIndex = supportChatState[index].messages.findIndex((item) => item.id === randomId);

          if (objectIndex !== -1) {
            supportChatState[index].messages[objectIndex] = result.data.data;
            setSupportChat(supportChatState);
            setSupportChatToDisplay(supportChatState);
          }
        } else {
          const objectIndex = connectionChatState.findIndex((item) => item.id === randomId);
          if (objectIndex !== -1) {
            selectedConnectionChatMessages[objectIndex] = result.data.data;
            setSelectedConnectionChatMessages(selectedConnectionChatMessages);
          }
          setConnectionChatMessages([...connectionChatMessages, result.data.data]);
        }

        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
    setIsSending(false);
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [selectedSupportChatMessages]);

  useEffect(() => {
    if (clistRef.current) {
      clistRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [selectedConnectionChatMessages]);

  return (
    <MainCard title="">
      {isLoading ? (
        <PageLoader />
      ) : (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Support Chats" />
              <Tab label="Connection Chats" />
            </Tabs>
          </Box>
          {tabValue === 0 && (
            <Grid container component={Paper}>
              <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
                <Divider />
                <Grid item xs={12} sx={{ padding: '10px' }}>
                  <TextField
                    id="outlined-basic-email"
                    label="Search"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => onSearch(e.target.value)}
                  />
                </Grid>
                <Divider />
                <List sx={{ maxHeight: '40vh', overflowY: 'auto' }}>
                  {supportChatToDisplay.map((chat) => (
                    <ListItem
                      button
                      key={chat.id}
                      selected={chat.id === selectedSupportChatId}
                      onClick={() => handleMessageSelect(chat.id)}
                    >
                      <ListItemIcon sx={{ mr: 1 }}>
                        <Avatar alt={chat.user.name} src={chat.user.dpUrl} />
                      </ListItemIcon>
                      <ListItemText primary={chat.user.name} secondary={chat.title}>
                        {chat.user.name}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={9}>
                <List sx={{ maxHeight: '40vh', overflowY: 'auto' }}>
                  {selectedSupportChatMessages.map((msg) => (
                    <ListItem key={msg.id}>
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            align={!msg.isAdmin ? 'left' : 'right'}
                            primary={msg.body}
                            sx={{
                              backgroundColor: !msg.isAdmin ? theme.palette.secondary.main : theme.palette.primary.main,
                              color: !msg.isAdmin ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText,
                              borderRadius: '16px',
                              marginBottom: '8px',
                              padding: '8px 16px'
                            }}
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align="right"
                            secondary={msg.createdAt === '...' ? msg.createdAt : dateConverter2(msg.createdAt)}
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                  <ListItem ref={listRef} />
                </List>
                <Divider />
                <Grid container style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '5px', paddingTop: '10px' }}>
                  <Grid item xs={12}>
                    <Button fullWidth variant="contained" disabled={isClosing} onClick={() => handleChatClose(selectedSupportChatId)}>
                      Close Chat
                    </Button>
                  </Grid>
                </Grid>
                <Grid container style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '5px', paddingTop: '5px' }}>
                  <Grid item xs={11}>
                    <TextField
                      id="outlined-basic-email"
                      label="Message..."
                      fullWidth
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={1} align="right">
                    <Fab disabled={isSending} color="primary" size="small" aria-label="add" onClick={() => sendMessage(true)}>
                      <SendOutlined style={{ fontSize: '14px' }} />
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
          {tabValue === 1 && (
            <Grid container component={Paper}>
              <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
                <Divider />
                <Grid item xs={12} sx={{ padding: '10px' }}>
                  <TextField
                    id="outlined-basic-email"
                    label="Search"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => onConnectionSearch(e.target.value)}
                  />
                </Grid>
                <Divider />
                <List sx={{ maxHeight: '40vh', overflowY: 'auto' }}>
                  {connectionChatToDisplay.map((chat) => (
                    <ListItem
                      button
                      key={chat.id}
                      selected={chat.id === selectedConnectionChatId}
                      onClick={() => handleConnectionMessageSelect(chat.id)}
                    >
                      <ListItemIcon sx={{ mr: 1 }}>
                        <Avatar alt={chat.user1.name} src={chat.user1.dpUrl} />
                      </ListItemIcon>
                      <ListItemText primary={chat.user1.name} secondary={`${chat.user2.name} Connection Chat`}>
                        {chat.user1.name}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={9}>
                <List sx={{ maxHeight: '40vh', overflowY: 'auto' }}>
                  {selectedConnectionChatMessages.map((msg) => (
                    <ListItem key={msg.id}>
                      <Grid container>
                        <Grid item xs={12}>
                          <ListItemText
                            align={!msg.isAdmin ? 'left' : 'right'}
                            primary={msg.body}
                            sx={{
                              backgroundColor: !msg.isAdmin ? theme.palette.secondary.main : theme.palette.primary.main,
                              color: !msg.isAdmin ? theme.palette.secondary.contrastText : theme.palette.primary.contrastText,
                              borderRadius: '16px',
                              marginBottom: '8px',
                              padding: '8px 16px'
                            }}
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align="right"
                            secondary={msg.createdAt === '...' ? msg.createdAt : dateConverter2(msg.createdAt)}
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                  <ListItem ref={clistRef} />
                </List>
                <Divider />
                <Grid container style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '5px', paddingTop: '5px' }}>
                  <Grid item xs={11}>
                    <TextField
                      id="outlined-basic-email"
                      label="Message..."
                      fullWidth
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={1} align="right">
                    <Fab disabled={isSending} color="primary" size="small" aria-label="add" onClick={() => sendMessage(false)}>
                      <SendOutlined style={{ fontSize: '14px' }} />
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </MainCard>
  );
};

export default Chats;
