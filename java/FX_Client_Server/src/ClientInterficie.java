import java.io.FileInputStream;
import java.util.concurrent.Semaphore;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.Text;
import javafx.stage.Stage;

//Aquesta classe s'encarrega de la interficie del Client
public class ClientInterficie extends Application{
	//variables per al tamany dels elements de la finestra
	public final float WIDTH_PESTANYA = 700;
	public final float HEIGHT_PESTANYA = 600;
	public final float WIDTH_ADINS = 600;
	public final float HEIGHT_ADINS = 500;
	public final float WIDTH_TEXTAREA = 550;
	public final float HEIGHT_TEXTAREA = 275;
	public final float WIDTH_BOTONS = 175;
	public final float HEIGHT_BOTONS = 60;
	public final float WIDTH_INPUT = 550;
	public final float HEIGHT_INPUT = 50;
	
	public TcpClient tcpClient;
	public Semaphore botoPremut = new Semaphore(0); //Aquest semafor s'encarrega d'enviar si s'ha premut o no el bot� d'enviar als threads
	public Semaphore desconectarBoto = new Semaphore(0); //Aquest semafor controla si l'usuari fa clic al bot� de desconectar
	
	public static void main(String[] args) {
		System.setProperty("javax.net.ssl.trustStore", "ClientTrustStore.jks");
		System.setProperty("javax.net.ssl.trustStorePassword", "123456");
		Application.launch(args);
	}
	
	@Override
	public void start(Stage primaryStage) throws Exception {
		VBox hBoxAdins = crearVboxAdins();;
		
		HBox vBoxBotons = (HBox) hBoxAdins.getChildren().get(3);
		stopButton((Button) vBoxBotons.getChildren().get(0));
		enviarButton((Button) vBoxBotons.getChildren().get(1), (TextField) hBoxAdins.getChildren().get(2));

		tcpClient = new TcpClient((TextArea) hBoxAdins.getChildren().get(1), (TextField) hBoxAdins.getChildren().get(2), botoPremut, desconectarBoto);
		tcpClient.start();
		
		Label labelTotal = new Label("", hBoxAdins);
		labelTotal.setMaxSize(WIDTH_PESTANYA, HEIGHT_PESTANYA);
		labelTotal.setMinSize(WIDTH_PESTANYA, HEIGHT_PESTANYA);
		labelTotal.setAlignment(Pos.CENTER);
		labelTotal.setBackground(new Background(new BackgroundFill(Color.DARKORANGE, new CornerRadii(0), Insets.EMPTY)));
		
		primaryStage.getIcons().add(new Image(new FileInputStream("./ClientIcon.png")));
		primaryStage.setTitle("Client");
		Scene scene = new Scene(labelTotal);
		primaryStage.setScene(scene);
		primaryStage.show();
	}
	
	private void stopButton(Button botoStop) {
		botoStop.setOnAction(new EventHandler<ActionEvent>() {
			@Override
			public void handle(ActionEvent event) {
				desconectarBoto.release();
				botoPremut.release();
			}
		});
	}

	private void enviarButton(Button botoEnviar, TextField missatgeField) {
		botoEnviar.setOnAction(new EventHandler<ActionEvent>() {
			@Override
			public void handle(ActionEvent event) {
				enviarMissatge(botoEnviar, missatgeField);
			}
		});
		
		//Per si l'usuari fa enter (que es lo mes comu)
		missatgeField.setOnAction(new EventHandler<ActionEvent>() {
			@Override
			public void handle(ActionEvent event) {
				enviarMissatge(botoEnviar, missatgeField);
			}
		});
	}
	
	private void enviarMissatge(Button botoEnviar, TextField missatgeField) {
		//Faig release per a comunicar al thread que s'ha premut el boto d'enviar
		botoPremut.release();
	}

	private VBox crearVboxAdins() {
		//Creo tota la estructura d'elements
		Text textServidor = new Text("Client");
		TextArea textArea = new TextArea();
		Button botoStop = new Button("Desconectar");
		Button botoStart = new Button("Enviar");
		TextField missatge = new TextField();
		
		missatge.setFont(Font.font(15));
		missatge.setPromptText("Missatge a enviar. . .");
		missatge.setPadding(new Insets(0,20,0,20));
		missatge.setMinSize(WIDTH_INPUT, HEIGHT_INPUT);
		missatge.setMaxSize(WIDTH_INPUT, HEIGHT_INPUT);
		
		textServidor.setFont(Font.font(25));
		textServidor.setFill(Color.WHITE);;
		textServidor.setStyle("-fx-underline: true;");
		
		textArea.setMinSize(WIDTH_TEXTAREA, HEIGHT_TEXTAREA);
		textArea.setMaxSize(WIDTH_TEXTAREA, HEIGHT_TEXTAREA);
		textArea.setWrapText(true);
		textArea.setEditable(false);
		
		modificarBoto(botoStop, Color.RED);
		modificarBoto(botoStart, Color.GREEN);
		
		HBox hBoxBotons = new HBox(botoStop, botoStart);
		hBoxBotons.setAlignment(Pos.CENTER);
		HBox.setMargin(botoStop, new Insets(0, 25, 0, 0));
		HBox.setMargin(botoStart, new Insets(0, 0, 0, 25));
		
		VBox vBoxAdins = new VBox(textServidor, textArea, missatge, hBoxBotons);
		vBoxAdins.setBackground(new Background(new BackgroundFill(Color.ORANGE ,new CornerRadii(0), Insets.EMPTY)));
		vBoxAdins.setMaxSize(WIDTH_ADINS, HEIGHT_ADINS);
		vBoxAdins.setMinSize(WIDTH_ADINS, HEIGHT_ADINS);
		vBoxAdins.setAlignment(Pos.CENTER);
		VBox.setMargin(missatge, new Insets(15, 0, 15, 0));
		VBox.setMargin(textServidor, new Insets(0, 0, 20, 0));
		VBox.setMargin(hBoxBotons, new Insets(0, 0, 0, 0));
		
		return vBoxAdins;
	}
	
	public void modificarBoto(Button boto, Color color) {
		boto.setMinSize(WIDTH_BOTONS, HEIGHT_BOTONS);
		boto.setMaxSize(WIDTH_BOTONS, HEIGHT_BOTONS);
		boto.setBackground(new Background(new BackgroundFill(color ,new CornerRadii(0), Insets.EMPTY)));
		boto.setStyle("-fx-text-fill:white;");
		boto.setFont(Font.font(15));
	}
}
