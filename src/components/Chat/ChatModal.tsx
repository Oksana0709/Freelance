import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useImperativeHandle } from 'react';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { User } from '../../redux/user/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchOrders } from '../../redux/order';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import bemCreator from '../bemCreator';
import io from 'socket.io-client';
import { Message } from '../../redux/message/types';
import FileDrop from '../FileDrop';

const socket = io(BASE_URL);

const cn = bemCreator('component-chat-modal');

export interface IModalRef {
    handleClickOpen: () => void;
    handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {}

const ChatModal = forwardRef<IModalRef, Props>(({}, ref) => {
    const [formValues, setFormValues] = React.useState<any>({ content: '' });
    const [open, setOpen] = React.useState<boolean>(false);
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [chatId, setChatId] = React.useState<number>(0);

    const orders = useAppSelector((state: RootState) => state.order.orders);
    const currentUser = useAppSelector((state: RootState) => state.user.currentUser);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchOrders());

        socket.on('message', message => {
            setMessages(prev => [...prev, message]);
        });

  
        socket.on('chatHistory', history => {
            setMessages(history);
        });

        return () => {
            socket.off('message');
            socket.off('chatHistory');
        };
    }, []);

    const handleChange = (event: any) => {
        const { name, value } = event?.target;

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleJoinChat = () => {
      
        socket.emit('joinChat', chatId);
    };

    const handleClickChat = (id: number) => {
        setChatId(id);
        handleJoinChat();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useImperativeHandle(ref, () => ({
        handleClickOpen,
        handleClose,
    }));

    const clearMessage = () => {
        setFormValues({ content: '' });
    };

    const handleSendMessage = async () => {
        const payload = {
            senderId: currentUser?.id || null,
            chatId: chatId || null,
            content: formValues?.content,
        };

        console.log(payload);

        socket.emit('sendMessage', payload);

        clearMessage();
    };

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Чат
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className="component-chat-modal__wrap">
                    <div className="component-chat-modal__left">
                        {[{ id: 100 }, { id: 200 }].map(order => (
                            <div className="component-chat-modal__user" key={order.id} onClick={() => handleClickChat(order.id)}>
                                {order.id}
                            </div>
                        ))}
                    </div>

                    <div className="component-chat-modal__right">
                        <h2>{chatId}</h2>
                        <List sx={{ height: '100%', overflowY: 'scroll', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {/* @ts-ignore */}
                            {messages.map((message: any) => {
                                const isMyMessage = message.senderId === currentUser.id;

                                return (
                                    <>
                                        <ListItem className={cn('message', { my: isMyMessage })} key={message?.id}>
                                            <ListItemText primary={message?.content} secondary={message?.timestamp?.toString()} />
                                        </ListItem>
                                    </>
                                );
                            })}
                        </List>
                        <div className="component-chat-modal__send-form">
                            <TextField
                                onChange={handleChange}
                                value={formValues?.content}
                                name="content"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <IconButton onClick={handleSendMessage} sx={{ position: 'absolute', right: '0' }}>
                                            <SendIcon sx={{ width: '35px', height: '35px' }} />
                                        </IconButton>
                                    ),
                                }}
                                variant="standard"
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
});

export default ChatModal;
