import java.io.IOException;
import java.io.PrintStream;
import java.util.concurrent.Semaphore;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.net.ssl.SSLServerSocket;
import javax.net.ssl.SSLSocket;

import javafx.scene.control.TextArea;

public class TcpServerThreadEnviar extends Thread{
	public SSLSocket clientSocket;
	public Semaphore enviarDades;
	public DadesCompartidaServidor dadesCompartides;
	public TextArea textArea;
	public SSLServerSocket serverSocket;
	
	public TcpServerThreadEnviar(SSLSocket clientSocket, Semaphore enviarDades, DadesCompartidaServidor dadesCompartides, TextArea textArea, SSLServerSocket serverSocket) {
		this.clientSocket = clientSocket;
		this.enviarDades = enviarDades;
		this.dadesCompartides = dadesCompartides;
		this.textArea = textArea;
		this.serverSocket = serverSocket;
	}
	
	@Override
	public void run() {
		enviarDades();
	}
	
	public void enviarDades() {
		while(!dadesCompartides.getStopServidor()) {
			try {
				PrintStream out = null;
				
				while(!dadesCompartides.getStopServidor()) {
					try {
						this.enviarDades.acquire();
							if(!dadesCompartides.getStopServidor()) {
								//En cas de que tot segueixi el seu curs normal entrara aqui per a enviar les dades als clients
								textArea.setText(textArea.getText() + "\n[" + this.dadesCompartides.getNomClient() + "] " + this.dadesCompartides.getMissatge());
								for(SSLSocket clientIndividual : TcpServer.clientsSocket) {
									if(TcpServer.nomUsuariRebut.get(TcpServer.clientsSocket.indexOf(clientIndividual)) == true) {
										out = new PrintStream(clientIndividual.getOutputStream());
										out.println("[" + this.dadesCompartides.getNomClient() + "]\t" + this.dadesCompartides.getMissatge());
										out.flush();
									}
								}
								if(this.dadesCompartides.getMissatge().equals(TcpServer.paraulaTancarConnexio)) {
									closeClient(this.dadesCompartides.getSocketTancarConnexio());
									int indexSocket = TcpServer.clientsSocket.indexOf(this.dadesCompartides.getSocketTancarConnexio());
									TcpServer.clientsSocket.remove(this.dadesCompartides.getSocketTancarConnexio());
									TcpServer.nomUsuaris.remove(indexSocket);
									TcpServer.nomUsuariRebut.remove(indexSocket);
								}
							}else {
								//Missatge que s'envia als clients al parar el servidor
								for(SSLSocket clientIndividual : TcpServer.clientsSocket) {
									if(TcpServer.nomUsuariRebut.get(TcpServer.clientsSocket.indexOf(clientIndividual)) == true) {
										out = new PrintStream(clientIndividual.getOutputStream());
										out.println("[SERVIDOR]\tEstic tancant . . .");
										out.flush();
									}
								}
								serverSocket.close();
							}
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				
			} catch (IOException ex) {
				Logger.getLogger(TcpServer.class.getName()).log(Level.SEVERE, null, ex);
			}
		}		
	}
	
	private void closeClient(SSLSocket clientSocket) {
		try {
			clientSocket.close();
		} catch (IOException ex) {
			Logger.getLogger(TcpServer.class.getName()).log(Level.SEVERE, null, ex);
		}
	}
}
